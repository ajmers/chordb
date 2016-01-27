import React, { Component, PropTypes } from 'react';
import './instrument-string.scss';

export default class InstrumentString extends Component {
    static propTypes = {
        maxFret: PropTypes.number,
        minFret: PropTypes.number,
        string: PropTypes.shape({
            finger: PropTypes.number,
            fret: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    };

    renderFret(isFretted, finger, index) {
        const frettedClass = isFretted ? 'mark' : '';
        return (
            <div className={`fret ${frettedClass}`} key={index}>
                {isFretted ? <div className='dot'>{finger}</div> : ''}
            </div>
        );
    }

    render() {
        const { maxFret, minFret, string: { finger, fret } } = this.props;

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
                    return this.renderFret(isFretted, finger, index);
                })}
            </div>
        );
    }
}
