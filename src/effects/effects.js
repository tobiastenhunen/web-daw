import * as Tone from "tone"
import {getFilterOutput, init as initFilter} from "./filter"


export const effectsInput = new Tone.Gain()
export const effectsOutput = new Tone.Gain()

const effects = {
    filter: new Tone.Filter(2000, "lowpass", -24),
    distortion: new Tone.Distortion({distortion: 0.5, wet: 0}),
    reverb: new Tone.Reverb({decay: 1.5, wet: 0}),
    chorus: new Tone.Chorus({frequency: 1.5, delayTime: 3.5, depth: 0.7, wet: 0}),
    phaser: new Tone.Phaser({frequency: 0.5, octaves: 3, wet: 0})
}

export function setEffectParam(effectName, property, value) {
    console.log("Setting ", effectName, property, "to: ", value)
    effects[effectName].set({[property]: value})
}

export function init(){
    const updateParam = (e) => {
        const element = e.currentTarget
        setEffectParam(
            element.dataset.effect,
            element.dataset.param,
            element.value
        )
    }

    document.querySelectorAll(".effect-param").forEach((element) => {
        element.addEventListener("input", updateParam)
    })
    document.querySelectorAll(".effect-mix-knob").forEach((element => {
        element.addEventListener("input", updateParam)
    }))

    effectsInput.connect(effects.filter)
    initFilter(effects.filter, effectsInput)
    const filterOutput = getFilterOutput()

    filterOutput.chain(
    effects.distortion,
    effects.reverb,
    effects.chorus,
    effects.phaser,
    effectsOutput
)
}
