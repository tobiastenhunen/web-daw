import {init as initSequencer} from "./sequencer.js"
import { init as initEffects } from "./effects/effects.js"
import { toggleRecording, finishRecording, recorder } from "./recorder.js"
import * as Piano from "./piano_roll.js"
import * as Tone from "tone"
import draw from "./visualizer.js"


const togglePauseBtn = document.getElementById("toggle-pause")
const endRecordingBtn = document.getElementById("end-recording")
const shapeSelect = document.getElementById("shape-select")
const panKnob = document.getElementById("pan-knob")
const mixKnob = document.getElementById("mix-knob")
const attackKnob = document.getElementById("attack-knob")
const releaseKnob = document.getElementById("release-knob")
const voicesInput = document.getElementById("voices-input")


function init() {
  console.log(Tone.Synth.getDefaults().oscillator.type)
  initSequencer()
  Piano.init()
  initButtons()
  initEffects()
  draw()
}

function initButtons() {
  togglePauseBtn.addEventListener("click", togglePause)
  endRecordingBtn.addEventListener("click", finishRecording)
  shapeSelect.addEventListener("input", () => {Piano.setShape(shapeSelect.value)})
  panKnob.addEventListener("input", () => {Piano.setPan(panKnob.value)})
  mixKnob.addEventListener("input", () => {Piano.setVolume(mixKnob.value)})
  attackKnob.addEventListener("input", () => {Piano.setAttack(attackKnob.value)})
  releaseKnob.addEventListener("input", () => {Piano.setRelease(releaseKnob.value)})
  voicesInput.addEventListener("input", () => {Piano.setVoices(voicesInput.value)})
}

function togglePause() {
  toggleRecording()

  // Doing this here so I don't have to pass buttons around.
  switch (recorder.state) {
    case ("paused"):
      togglePauseBtn.innerHTML = "▶"
      break;

    case("started"):
      togglePauseBtn.innerHTML = "⏸"
      break;

    case("stopped"):
      togglePauseBtn.innerHTML = "⏺"
  }
}

function updatePauseButton() {
    switch (recorder.state) {
    case ("paused"):
      togglePauseBtn.innerHTML = "⏺"
      break;

    case("started"):
      togglePauseBtn.innerHTML = "⏸"
      break;

    case("stopped"):
      togglePauseBtn.innerHTML = "⏺"
      break
  }
}

addEventListener("load", init)
