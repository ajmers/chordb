import createReducer from '../../utils/create-reducer';

const initialState = {
    instrument: 'Choose one',
    tonic: 'Choose one',
    type: 'Choose one',
    instrumentChosen: false,
    inProgressChord: null,
};

export default createReducer(initialState, {
    ['CHORD_SAVED']: (state, action) => {
        return {
            ...initialState,
        };
    },
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
    ['NAME_UPDATED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            name: chord.name,
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
    ['FRET_ADDED']: (state, action) => {
        const { numFrets } = action.data;
        return {
            ...state,
            numFrets,
        };
    },
    ['MIN_FRET_CHANGED']: (state, action) => {
        const { chord } = action.data;
        return {
            ...state,
            inProgressChord: chord,
        };
    },
});
