import createReducer from '../../utils/create-reducer';

const initialState = {
    isOpen: false,
    addingSong: false,
    currentSong: {
        title: '',
        chords: [],
    },
    songs: [],
};

export default createReducer(initialState, {
    ['SONGS_FETCHED']: (state, action) => {
        return {
            ...state,
            songs: action.data.songs,
        };
    },
    ['SONG_CHORDS_FETCHED']: (state, action) => {
        return {
            ...state,
            fetchedSong: action.data.res,
        };
    },
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
    ['SONG_SAVED']: (state, action) => {
        return {
            ...state,
            addingSong: false,
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
    ['SONG_CHORD_REMOVED']: (state, action) => {
        const { chord } = action.data;
        const { currentSong } = state;
        const { chords } = currentSong;
        const chordsWithoutRemoved = chords.filter(ch => {
            return ch.id !== chord.id;
        });
        return {
            ...state,
            currentSong: {
                ...currentSong,
                chords: chordsWithoutRemoved,
            },
        };
    },
});
