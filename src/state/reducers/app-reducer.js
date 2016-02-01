import createReducer from '../../utils/create-reducer';

const initialState = {
    addChordOpen: false,
};

export default createReducer(initialState, {
    ['ADD_CHORD_OPENED']: (state, action) => {
        return {
            ...state,
            addChordOpen: true,
        };
    },
    ['CHORD_SAVED']: (state, action) => {
        return {
            ...state,
            addChordOpen: false,
        };
    },
    ['ADD_CHORD_CLOSED']: (state, action) => {
        return {
            ...state,
            addChordOpen: false,
        };
    },
});
