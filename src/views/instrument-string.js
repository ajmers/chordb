import React, { Component, PropTypes } from 'react';
import './instrument-string.scss';

export default class InstrumentString extends Component {
    renderFret(isFretted, fret) {
        const frettedClass = isFretted ? 'mark' : '';
        return (
            <div className={`fret ${frettedClass}`}>
                {isFretted ? <div className='dot'>{fret}</div> : ''}
            </div>
        );
    }
    render() {
        const { maxFret, minFret, string: { fret } } = this.props;

        const unfrettedClass = fret === 0 ? 'no-fret' : '';
        const unplayedClass = fret === 'X' ? 'unplayed' : '';
        const fretClass = !(unfrettedClass || unplayedClass) ?
            `fret-${fret}` : '';

        const fretArray = new Array(Math.max(maxFret, 4));
        fretArray.fill(0);
        return (
            <div className={`instrument-string ${fretClass}
                    ${unplayedClass} ${unfrettedClass}`}>
                {fretArray.map((fretI, index) => {
                    const isFretted = (index === fret - 1) && !unfrettedClass;
                    return this.renderFret(isFretted, fret);
                })}
            </div>
        );
    }
}
