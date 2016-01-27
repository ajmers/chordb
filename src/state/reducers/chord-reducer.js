import createReducer from '../../utils/create-reducer';

const initialState = [];

export default createReducer(initialState, {
    ['FETCHED_CHORDS']: (state, action) => {
        const { chords: fetchedChords } = action.data;
        return fetchedChords;
    },
});
