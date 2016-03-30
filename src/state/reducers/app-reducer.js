import createReducer from '../../utils/create-reducer';

const initialState = {
    createChordOpen: false,
};

export default createReducer(initialState, {
    ['CREATE_CHORD_OPENED']: (state, action) => {
        return {
            ...state,
            createChordOpen: true,
        };
    },
    ['CHORD_SAVED']: (state, action) => {
        return {
            ...state,
            createChordOpen: false,
        };
    },
    ['CREATE_CHORD_CLOSED']: (state, action) => {
        return {
            ...state,
            createChordOpen: false,
        };
    },
});
