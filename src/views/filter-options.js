import { instrumentFilterChanged, tonicFilterChanged } from '../state/actions/filter-actions';

export const instrumentFilter = {
    name: 'instrument',
    onChange: instrumentFilterChanged,
    defaultValue: 'Mandolin',
    options: [
        { value: 'All', label: 'All' },
        { value: 'Guitar', label: 'Guitar' },
        { value: 'Mandolin', label: 'Mandolin' },
    ],
};

export const tonicFilter = {
    name: 'tonic',
    defaultValue: 'C',
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
