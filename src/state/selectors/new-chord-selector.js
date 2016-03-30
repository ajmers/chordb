import { createSelector } from 'reselect';

function validateChordComplete(properties) {
    const { inProgressChord: chord } = properties;
    return !!chord && chord.hasOwnProperty('name') &&
        chord.hasOwnProperty('tonic') &&
        chord.hasOwnProperty('type') &&
        chord.hasOwnProperty('instrument') &&
        !!chord.fingerings.find(string => {
            return string.fret != '0';
        });
}

export const validateChord = createSelector(
    state => state.newChordProperties,
    validateChordComplete,
);
