import * as Tone from "tone"

const FG_VARIABLE_NAME = "--visualizer-fg"

const analyser = new Tone.Analyser("waveform", 1024)
Tone.getDestination().connect(analyser)

const canvas = document.getElementById("visualizer-canvas")
const ctx = canvas.getContext("2d")

const visualizerContainer = document.getElementById("visualizer-container")
window.addEventListener("resize", _resize_canvas)
document.addEventListener("DOMContentLoaded", _resize_canvas)


export default function draw() {
    requestAnimationFrame(draw)
    const values = analyser.getValue()
    const strokeColor = getComputedStyle(document.documentElement).getPropertyValue(FG_VARIABLE_NAME)


    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 2
    ctx.strokeStyle = strokeColor
    const stepWidth = canvas.width / values.length

    ctx.beginPath()

    let xPos = 0
    for (let i = 0; i < values.length; i++) {
        const yPos = (values[i] + 1) / 2 * canvas.height

        if (i == 0) {
            ctx.moveTo(xPos, yPos)
        }

        else {
            ctx.lineTo(xPos, yPos)
        }

        xPos += stepWidth
    }

    ctx.stroke()
}

function _resize_canvas() {
    const containerRect = visualizerContainer.getBoundingClientRect()
    canvas.width = containerRect.width
    canvas.height = containerRect.height
}
