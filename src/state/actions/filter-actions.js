export function instrumentFilterChanged(value) {
    return {
        type: 'INSTRUMENT_FILTERED',
        instrument: value,
    };
}

export function tonicFilterChanged(value) {
    return {
        type: 'TONIC_FILTERED',
        tonic: value,
    };
}
