const initialState = {
    instrument: 'Mandolin',
    tonic: 'F#',
};

const actionsMap = {
    'INSTRUMENT_FILTERED': (state, action) => action.data,
    'TONIC_FILTERED': (state, action) => action.data,
};

export default function filters(state = initialState, action) {
    const fn = actionsMap[action.type];
    if (!fn) {
        return state;
    }
    return fn(state, action);
}
