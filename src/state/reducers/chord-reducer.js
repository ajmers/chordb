import createReducer from '../../utils/create-reducer';

const initialState = [];

export default createReducer(initialState, {
    ['FETCHED_CHORDS']: (state, action) => {
        const { chords: fetchedChords } = action.data;
        return fetchedChords;
    },

    ['CHORD_SAVED']: (state, action) => {
        const { savedChord: chord } = action.data;
        const chords = Object.assign([], state);
        chords.push(chord);
        return chords;
    },
});
