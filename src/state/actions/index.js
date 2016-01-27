import $ from 'jquery';

export function fetchChords() {
    return dispatch => {
        $.ajax('http://localhost:8080/api/chords')
            .then(resp => dispatch({
                type: 'FETCHED_CHORDS',
                chords: resp,
            }));
    };
}
