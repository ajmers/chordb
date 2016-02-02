import createReducer from '../../utils/create-reducer';

const initialState = {
    isOpen: false,
};

export default createReducer(initialState, {
    ['SONGSHEET_TOGGLED']: (state, action) => {
        return {
            ...state,
            isOpen: !state.isOpen,
        };
    },
    ['SONG_ADDED']: (state, action) => {
        return {
            ...state,
            addingSong: true,
        };
    },
});
