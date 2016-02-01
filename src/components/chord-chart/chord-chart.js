import React, { Component, PropTypes } from 'react';
import InstString from '../instrument-string/instrument-string';

import './chord-chart.scss';

export default class ChordChart extends Component {
    getMaxFret(chord) {
        return Math.max.apply(null, chord.fingerings.map(string => {
            return parseInt(string.fret) ? string.fret : 0;
        }));
    }

    render() {
        const { chord } = this.props;
        const maxFret = this.getMaxFret(chord);
        const { minFret } = chord;
        return (
            <div className='chord-chart'>
                <span className='chord__min-fret'>{minFret ? minFret + 'fr' : ''}</span>
                {chord.fingerings.map((string, i) => {
                    return (<InstString key={i}
                        stringIndex={i}
                        string={string}
                        maxFret={maxFret}
                        minFret={minFret}
                    />);
                })}
            </div>
        );
    }
}
