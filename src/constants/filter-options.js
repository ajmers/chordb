import { instrumentFilterChanged, tonicFilterChanged, typeFilterChanged } from '../state/actions/filter-actions';

export const instrumentFilter = {
    name: 'instrument',
    onChange: instrumentFilterChanged,
    defaultValue: 'All',
    options: [
        { value: 'All', label: 'All' },
        { value: 'Guitar', label: 'Guitar' },
        { value: 'Mandolin', label: 'Mandolin' },
    ],
};

export const typeFilter = {
    name: 'type',
    onChange: typeFilterChanged,
    defaultValue: 'All',
    options: [
        { value: 'All', label: 'All' },
        { value: 'Major', label: 'Major' },
        { value: 'Minor', label: 'Minor' },
        { value: 'Diminished', label: 'Diminished' },
        { value: 'Augmented', label: 'Augmented' },
        { value: '7', label: '7' },
        { value: '6', label: '6' },
    ],
};

export const tonicFilter = {
    name: 'tonic',
    defaultValue: 'All',
    onChange: tonicFilterChanged,
    options: [
        { value: 'All', label: 'All' },
        { value: 'C', label: 'C' },
        { value: 'C#', label: 'C#' },
        { value: 'D', label: 'D' },
        { value: 'D#', label: 'D#' },
        { value: 'Eb', label: 'Eb' },
        { value: 'E', label: 'E' },
        { value: 'F', label: 'F' },
        { value: 'F#', label: 'F#' },
        { value: 'G', label: 'G' },
        { value: 'G#', label: 'G#' },
        { value: 'Ab', label: 'Ab' },
        { value: 'A', label: 'A' },
        { value: 'Bb', label: 'Bb' },
        { value: 'B', label: 'B' },
    ],
};
