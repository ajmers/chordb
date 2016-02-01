const typeLookup = {
    instrument: 'INSTRUMENT_FILTERED',
    type: 'TYPE_FILTERED',
    tonic: 'TONIC_FILTERED',
};

export function filterChanged(key, value) {
    const actionType = typeLookup[key];
    return {
        type: actionType,
        data: {
            [key]: value,
        },
    };
}
