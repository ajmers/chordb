import $ from 'jquery';

export function songsheetToggled() {
    return {
        type: 'SONGSHEET_TOGGLED',
    };
}

export function songAdded() {
    return {
        type: 'SONG_ADDED',
    };
}

export function songTitleChanged(title) {
    return {
        type: 'SONG_TITLE_CHANGED',
        data: { title },
    };
}

export function chordAddedToSong(chord) {
    return {
        type: 'SONG_CHORD_ADDED',
        data: { chord },
    };
}

export function songSaved(song) {
    const { title, chords } = song;
    const chordIds = chords.map(({ _id }) => _id);
    return dispatch => {
        $.ajax({
            url: 'http://localhost:8080/api/songs',
            method: 'POST',
            data: { title, chords: chordIds },
        }).then(res => dispatch({
            type: 'SONG_SAVED',
            data: res,
        }));
    };
}
