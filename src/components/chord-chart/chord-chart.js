import React, { Component, PropTypes } from 'react';

import InstString from '../instrument-string/instrument-string';

import './chord-chart.scss';

export default class ChordChart extends Component {
    static propTypes = {
        chord: PropTypes.object,
        numFrets: PropTypes.number,
    };

    render() {
        const { chord, numFrets } = this.props;
        const { minFret } = chord;
        return (
            <div className='chord-chart'>
                <span className='chord__min-fret'>{minFret ? minFret + 'fr' : ''}</span>
                {chord.fingerings.map((string, i) => {
                    return (<InstString key={i}
                        stringIndex={i}
                        string={string}
                        numFrets={numFrets}
                        minFret={minFret}
                    />);
                })}
            </div>
        );
    }
}
