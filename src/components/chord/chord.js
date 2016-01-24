import React, { Component, PropTypes } from 'react';
import InstString from '../instrument-string/instrument-string';

import './chord.scss';

export default class Chord extends Component {
    getMaxFret(chord) {
        return Math.max.apply(null, chord.fingerings.map(string => {
            return typeof string.fret === 'number' ? string.fret : 0;
        }));
    }

    getMinFret(chord) {
        return Math.min.apply(null, chord.fingerings.map(string => {
            return typeof string.fret === 'number' ? string.fret : null;
        }).filter(fret => !!fret));
    }

    render() {
        const { chord } = this.props;
        const maxFret = this.getMaxFret(chord);
        const minFret = chord.minFret || this.getMinFret(chord);
        return (
            <div className={`chord ${chord.name}`}>
                {chord.fingerings.map(string => {
                    return (<InstString
                        string={string}
                        maxFret={maxFret}
                        minFret={minFret}
                    />);
                })}
            </div>
        );
    }
}
