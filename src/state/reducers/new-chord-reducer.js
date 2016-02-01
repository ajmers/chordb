import createReducer from '../../utils/create-reducer';

const initialState = {
    instrument: 'Choose one',
    tonic: 'Choose one',
    type: 'Choose one',
    instrumentChosen: false,
};

export default createReducer(initialState, {
    ['INSTRUMENT_UPDATED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            instrument: chord.instrument,
            inProgressChord: chord,
            instrumentChosen: chord.instrument !== 'Choose one',
        };
    },
    ['TYPE_UPDATED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            type: chord.type,
            inProgressChord: chord,
        };
    },
    ['TONIC_UPDATED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            tonic: chord.tonic,
            inProgressChord: chord,
        };
    },
    ['STRING_MARKER_CLICKED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            inProgressChord: chord,
        };
    },
    ['FRET_CLICKED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            inProgressChord: chord,
        };
    },
});
