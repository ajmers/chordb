const initialState = [];

const actionsMap = {
  'CHORDS': (state, action) => action.chords
};

export default function chords(state = initialState, action) {
  const fn = actionsMap[action.type];
  if (!fn) {
    return state;
  }
  return fn(state, action);
}
