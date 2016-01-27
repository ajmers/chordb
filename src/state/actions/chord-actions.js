import $ from 'jquery';

export function fetchChords() {
    return dispatch => {
        $.ajax('http://localhost:8080/api/chords')
            .then(chords => dispatch({
                type: 'FETCHED_CHORDS',
                data: { chords },
            }));
    };
}
