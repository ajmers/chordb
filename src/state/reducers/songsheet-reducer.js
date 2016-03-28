import createReducer from '../../utils/create-reducer';

const initialState = {
    isOpen: false,
    addingSong: false,
    currentSong: {
        title: '',
        chords: [],
    },
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
    ['SONG_TITLE_CHANGED']: (state, action) => {
        const { title } = action.data;
        const { currentSong } = state;
        return {
            ...state,
            currentSong: {
                ...currentSong,
                title,
            },
        };
    },
    ['SONG_CHORD_ADDED']: (state, action) => {
        const { chord } = action.data;
        const { currentSong } = state;
        const { chords } = currentSong;
        return {
            ...state,
            currentSong: {
                ...currentSong,
                chords: chords.concat([chord]),
            },
        };
    },
    ['SONG_SAVED']: (state, action) => {
        const { savedSong } = action.data;
        return {
            ...state,
            currentSong: savedSong,
        };
    },
});
