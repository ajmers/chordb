import createReducer from '../../utils/create-reducer';
import { Chord } from '../../classes/chord';

const initialState = {
    instrument: 'Choose one',
    tonic: 'Choose one',
    type: 'Choose one',
    instrumentChosen: false,
};

function updateChord(inProgressChord, chordProps) {
    let chord;
    if (!inProgressChord) {
        chord = new Chord(chordProps);
    } else {
        chord = inProgressChord.update(chordProps);
    }
    return chord;
}

export default createReducer(initialState, {
    ['INSTRUMENT_UPDATED']: (state, action) => {
        const { instrument } = action.data;
        const chord = updateChord(state.inProgressChord, { instrument });
        return {
            ...state,
            instrument,
            inProgressChord: chord,
            instrumentChosen: instrument !== 'Choose one',
        };
    },
    ['TYPE_UPDATED']: (state, action) => {
        const { type } = action.data;
        const chord = updateChord(state.inProgressChord, { type });
        return {
            ...state,
            inProgressChord: chord,
            type,
        };
    },
    ['TONIC_UPDATED']: (state, action) => {
        const { tonic } = action.data;
        const chord = updateChord(state.inProgressChord, { tonic });
        return {
            ...state,
            inProgressChord: chord,
            tonic,
        };
    },
});
