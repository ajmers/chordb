import { Chord } from '../../classes/chord';
import $ from 'jquery';

const typeLookup = {
    name: 'NAME_UPDATED',
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
        chord = inProgressChord.update.call(inProgressChord, chordProps);
    }
    return chord;
}

export function chordSaved(chord) {
    const { name, fingerings, tonic, type, minFret, instrument } = chord;
    return dispatch => {
        $.ajax({
            url: 'http://localhost:8080/api/chords',
            method: 'POST',
            data: { name, fingerings, tonic, type, minFret, instrument },
        }).then(res => dispatch({
            type: 'CHORD_SAVED',
            data: res,
        }));
    };
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

export function stringMarkerClicked(stringIndex, isPlayed, chord) {
    const fret = isPlayed ? '0' : 'X';
    const updatedChord = updateFingering(chord, stringIndex, fret);
    return {
        type: 'STRING_MARKER_CLICKED',
        data: { chord: updatedChord },
    };
}

export function addFretClicked(length) {
    return {
        type: 'FRET_ADDED',
        data: { numFrets: length },
    };
}

export function minFretChanged(chord, value) {
    const numericalValue = parseInt(value) || 0;
    const updatedChord = updateChordMeta(chord, { minFret: numericalValue });
    return {
        type: 'MIN_FRET_CHANGED',
        data: { chord: updatedChord },
    };
}
