import { CrossFade } from "tone"

const fadeOutput = new CrossFade(0)

export function init(filterNode, dryNode) {
    filterNode.connect(fadeOutput.b)
    dryNode.connect(fadeOutput.a)
    fadeOutput.fade.value = 0

    const filterMix = document.getElementById("filter-mix")
    filterMix.addEventListener("input", () => {
        fadeOutput.fade.value = Number(filterMix.value)
    })
}

export function getFilterOutput() {
    return fadeOutput
}
