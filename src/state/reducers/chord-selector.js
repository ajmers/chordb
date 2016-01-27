import { createSelector } from 'reselect';

function chordMatchesFilters(chord, filters) {
    return !Object.keys(filters).find(filterKey => {
        return (filters[filterKey] !== 'All' &&
            chord[filterKey] &&
            filters[filterKey].toLowerCase()
                !== chord[filterKey].toLowerCase());
    });
}

function filterChords(chords, filters) {
    return chords.filter(chord => {
        return chordMatchesFilters(chord, filters);
    });
}

export const filteredChordSelector = createSelector(
    state => state.chords,
    state => state.filters,
    filterChords,
);
