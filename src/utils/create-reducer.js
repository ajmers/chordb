/**
 * This utility function creates a reducer function with an action map that is
 * provided when the reducer is created.
 *
 * @param initialState
 * @param actionMap
 * @returns {Function}
 */
export default function createReducer(initialState, actionMap) {
    return function (state = initialState, action = {}) {
        const reduceFn = actionMap[action.type];
        return reduceFn ? reduceFn(state, action) : state;
    };
}
