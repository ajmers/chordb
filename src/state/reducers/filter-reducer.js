import createReducer from '../../utils/create-reducer';

const initialState = {
    instrument: 'All',
    tonic: 'All',
    type: 'All',
};

export default createReducer(initialState, {
    ['INSTRUMENT_FILTERED']: (state, action) => {
        const { instrument } = action.data;
        return {
            ...state,
            instrument,
        };
    },
    ['TYPE_FILTERED']: (state, action) => {
        const { type } = action.data;
        return {
            ...state,
            type,
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
