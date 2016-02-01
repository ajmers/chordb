import { Chord } from '../../classes/chord';

const typeLookup = {
    instrument: 'INSTRUMENT_UPDATED',
    type: 'TYPE_UPDATED',
    tonic: 'TONIC_UPDATED',
};

function updateFingering(chord, stringIndex, fret, reset) {
    return chord.setStringFingering(stringIndex, reset ? 0 : fret);
}

function updateChordMeta(inProgressChord, chordProps) {
    let chord;
    if (!inProgressChord) {
        chord = new Chord(chordProps);
    } else {
        chord = inProgressChord.update(chordProps);
    }
    return chord;
}

export function chordPropertyUpdated(key, value, chord) {
    const actionType = typeLookup[key];

    const updatedChord = updateChordMeta(chord, { [key]: value });

    return {
        type: actionType,
        data: { chord: updatedChord },
    };
}

export function fretClicked(stringIndex, fret, chord, reset) {
    const updatedChord = updateFingering(chord, stringIndex, fret, reset);
    return {
        type: 'FRET_CLICKED',
        data: { chord: updatedChord },
    };
}
