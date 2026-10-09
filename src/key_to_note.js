export const KEY_TO_NOTES = {
  // number row
  'Digit2': 'C#1',
  'Digit3': 'D#2',
  'Digit5': 'F#2',
  'Digit6': 'G#2',
  'Digit7': 'A#2',
  'Digit9': 'C#3',
  'Digit0': 'D#3',

  // top letter row
  'KeyQ': 'C2',
  'KeyW': 'D3',
  'KeyE': 'E3',
  'KeyR': 'F3',
  'KeyT': 'G3',
  'KeyY': 'A3',
  'KeyU': 'B3',
  'KeyI': 'C4',
  'KeyO': 'D4',
  'KeyP': 'E4',

  // middle letter row (black keys for the bottom row)
  'KeyS': 'F#4',
  'KeyD': 'G#4',
  'KeyF': 'A#4',
  'KeyH': 'C#5',
  'KeyJ': 'D#5',

  // bottom letter row
  'KeyZ': 'F4',
  'KeyX': 'G4',
  'KeyC': 'A4',
  'KeyV': 'B4',
  'KeyB': 'C5',
  'KeyN': 'D5',
  'KeyM': 'E5',
};

export function keyToNote(key) {
    if (keyNoteMap.has(key)) {
        return keyNoteMap(key)
    }
}