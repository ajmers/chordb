export function instrumentFilterChanged(value) {
    return {
        type: 'INSTRUMENT_FILTERED',
        data: {
            instrument: value,
        },
    };
}

export function tonicFilterChanged(value) {
    return {
        type: 'TONIC_FILTERED',
        data: {
            tonic: value,
        },
    };
}
