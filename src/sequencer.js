import * as Tone from "tone"
import { recorder, finishRecording } from "./recorder.js"

const noteMap = { // Class name to note.
    "bass": "C2",
    "snare": "C5",
    "hihat": "C5",
}

const seqMap = { // Gets defined on runtime.
    "bass": null,
    "snare": null,
    "hihat": null, 
}

const stepIndicator = document.getElementById("step-indicator")

let snareSynth = new Tone.Synth
let hihatSynth = new Tone.PluckSynth
let bassSynth = new Tone.MembraneSynth

snareSynth.connect(recorder)
hihatSynth.connect(recorder)
bassSynth.connect(recorder)


snareSynth.toDestination()
bassSynth.toDestination()
hihatSynth.toDestination()

let bassSequence
let snareSequence
let hihatSequence


const maxSteps = 16
let currentStep = 0

let previousStep


export function init() {    
    document.querySelectorAll(".sequencer-button").forEach(button => {
        button.addEventListener("click", async () => {
            button.classList.toggle("active")
            Tone.start()

            let buttonClasses = button.classList
            
            buttonClasses.forEach((buttonClass) => {
                if (!(buttonClass in seqMap)) return
                updateSequence(buttonClass, noteMap[buttonClass])
            })
        })
    })

    Tone.Transport.start()
    initSynths()
    initSequences()
}


function initSynths() {
    bassSynth.pitchDecay = null
    snareSynth.volume.value = -8
}

function initSequences() {
    bassSequence = new Tone.Sequence((time, note) => {
        Tone.Draw.schedule(() => {
            updateCurrentStep()
        }, time)

        if (note) bassSynth.triggerAttackRelease(note, "8n", time)
    }, [], "16n").start(0)

    snareSequence = new Tone.Sequence((time, note) => {
        if (note) snareSynth.triggerAttackRelease(note, "8n", time)
    }, [], "16n").start(0)

    hihatSequence = new Tone.Sequence((time, note) => {
        if (note) hihatSynth.triggerAttackRelease(note, "8n", time)
    }, [], "16n").start(0)

    seqMap["bass"] = bassSequence
    seqMap["snare"] = snareSequence
    seqMap["hihat"] = hihatSequence
}

function updateSequence(sequencerBtnClass, note){
    console.log(currentStep)
    var sequencerButtons = document.querySelectorAll(`.sequencer-button.${sequencerBtnClass}`).forEach((button, index) => {
        if (button.classList.contains("active")){
            seqMap[sequencerBtnClass].events[index] = noteMap[sequencerBtnClass]
        }

        else {
            seqMap[sequencerBtnClass].events[index] = null
        }
    })
}

function updateCurrentStep(){
    // Current step is currently based off of just BassSequence.
    currentStep = Math.ceil(bassSequence.progress * maxSteps)
    stepIndicator.children[currentStep - 1].classList.add("activated")

    if (previousStep) {
        previousStep.classList.remove("activated")
    }

    previousStep = stepIndicator.children[currentStep - 1]
}
