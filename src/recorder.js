import * as Tone from "tone"

export const recorder = new Tone.Recorder()
Tone.getDestination().connect(recorder)

export function toggleRecording() {
    switch (recorder.state) {
        case ("started"):
            recorder.pause()
            break;

        case ("paused"):
        case ("stopped"):
            recorder.start()
            break;
    }
}

export async function finishRecording() {
    const recording = await recorder.stop()
    const url = URL.createObjectURL(recording)

    const anchor = document.createElement("a")
    anchor.download = "recording.webm"
    anchor.href = url
    anchor.click()
}