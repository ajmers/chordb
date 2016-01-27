import createReducer from '../../utils/create-reducer';

const initialState = {
    instrument: 'Mandolin',
    tonic: 'F#',
};

export default createReducer(initialState, {
    ['INSTRUMENT_FILTERED']: (state, action) => {
        const { instrument } = action.data;
        return {
            ...state,
            instrument,
        };
    },
    ['TONIC_FILTERED']: (state, action) => {
        const { tonic } = action.data;
        return {
            ...state,
            tonic,
        };
    },
});
