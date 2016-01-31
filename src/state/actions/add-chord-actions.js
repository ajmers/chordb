const typeLookup = {
    instrument: 'INSTRUMENT_UPDATED',
    type: 'TYPE_UPDATED',
    tonic: 'TONIC_UPDATED',
};

export function chordPropertyUpdated(key, value) {
    const actionType = typeLookup[key];
    return {
        type: actionType,
        data: {
            [key]: value,
        },
    };
}
