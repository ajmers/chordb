export function instrumentFilterChanged(value) {
    return {
        type: 'INSTRUMENT_FILTERED',
        data: {
            instrument: value,
        },
    };
}

export function typeFilterChanged(value) {
    return {
        type: 'TYPE_FILTERED',
        data: {
            type: value,
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
