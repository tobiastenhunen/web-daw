import * as Tone from "tone"
import { recorder } from "./recorder.js"

let pianoSynth = new Tone.PolySynth
let panner = new Tone.Panner

// Some shapes seem to be much louder than others, this should compensate for that.
const louderShapes = ["square", "sawtooth"]
const louderShapesVolume = -14

pianoSynth.connect(panner)
panner.connect(recorder)
panner.toDestination()

const notes = [
    "C", "C#", "D", "D#",
    "E", "F", "F#", "G",
    "G#", "A", "A#", "B"
]

let currentOctave = 2 // Also the lowest/starting octave

export function init() {
    const keyContainers = document.getElementById("keys").children

    let currentNoteIndex = 0
    Array.from(keyContainers).forEach((container) => {
        Array.from(container.children).forEach((key) => {
            if (currentNoteIndex > notes.length - 1) {
                currentOctave++
                currentNoteIndex = 0
            }
            addKeyEventListener(key, currentNoteIndex, currentOctave)
            currentNoteIndex++
        })
    })

    setShape("triangle")
}

export function setShape(shape) {
    let volume = 0
    
    if (louderShapes.includes(shape)) {
        volume = louderShapesVolume
    }

    pianoSynth.set(
        {oscillator: {
            type: shape,
            volume: volume,
        }}
    )
}

export function setPan(value) {
    panner.pan.rampTo(value)
}

export function setVolume(value) {
    pianoSynth.volume.rampTo(value)
}

function addKeyEventListener(key, noteIndex, octave = 4) {
    key.addEventListener("mousedown", () => {
        Tone.start()
        var attack = pianoSynth.triggerAttack(`${notes[noteIndex]}${octave}`)

        const stopPlaying = () => {
            attack.releaseAll()
            key.removeEventListener("mouseup", stopPlaying)
        }

        window.addEventListener("mouseup", stopPlaying)
    })
}
