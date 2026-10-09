import * as Tone from "tone"
import { effectsInput, effectsOutput } from "./effects/effects.js"
import { KEY_TO_NOTES } from "./key_to_note.js"

let pianoSynth = new Tone.PolySynth
let panner = new Tone.Panner
let currentNote
let pointerDown = false
let pointerNote

const keyboardNotesPlaying = new Set()

// Some shapes seem to be much louder than others, this should compensate for that.
const louderShapes = ["square", "sawtooth"]
const louderShapesVolume = -14

pianoSynth.connect(effectsInput)
effectsOutput.connect(panner)
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

    addEventListener("keydown", (e) => {
        playKeyboardNote(e)
    })

    addEventListener("keyup", (e) => {
        releaseKeyboardNote(e)
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

export function setAttack(seconds) {
    pianoSynth.set({envelope: {attack: seconds}})
}

export function setRelease(seconds) {
    pianoSynth.set({envelope: {release: seconds}})
}

export function setVoices(amount) {
    pianoSynth.maxPolyphony = amount
}

function pointerNotePlay(note) {
    pianoSynth.triggerAttack(note)
    pointerNote = note
}

function pointerNoteStop() {
    pianoSynth.triggerRelease(pointerNote)
    pointerNote = null
}

function playKeyboardNote(event) {
    if (!KEY_TO_NOTES[event.code]) {
        return
    }

    pianoSynth.triggerAttack(KEY_TO_NOTES[event.code])
    keyboardNotesPlaying.add(event.code)
}

function releaseKeyboardNote(event) {
    if (keyboardNotesPlaying.has(event.code)) {
        console.log("Releasing")
        const note = KEY_TO_NOTES[event.code]
        pianoSynth.triggerRelease(note)
        keyboardNotesPlaying.delete(event.code)
    }
}

document.addEventListener("pointerup", () => {
    pointerDown = false
    pointerNoteStop()
})

document.addEventListener("pointercancel", () => {
    pointerDown = false
    pointerNoteStop()
})

function addKeyEventListener(key, noteIndex, octave = 4) {
    const note = `${notes[noteIndex]}${octave}`
    key.addEventListener("pointerdown", (e) => {
        pointerDown = true
        Tone.start()
        pointerNotePlay(note)
    })

    key.addEventListener("pointerenter", () => {
        if (pointerDown) {pointerNotePlay(note)}
    })

    key.addEventListener("pointerleave", () => {
        if (pointerNote === note) {pointerNoteStop()}
    })
}
