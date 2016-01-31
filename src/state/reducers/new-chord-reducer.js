import createReducer from '../../utils/create-reducer';

const initialState = {
    instrument: 'Choose one',
    tonic: 'Choose one',
    type: 'Choose one',
};

export default createReducer(initialState, {
    ['INSTRUMENT_UPDATED']: (state, action) => {
        const { instrument } = action.data;
        return {
            ...state,
            instrument,
        };
    },
    ['TYPE_UPDATED']: (state, action) => {
        const { type } = action.data;
        return {
            ...state,
            type,
        };
    },
    ['TONIC_UPDATED']: (state, action) => {
        const { tonic } = action.data;
        return {
            ...state,
            tonic,
        };
    },
});
