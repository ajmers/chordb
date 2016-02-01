import React, { Component, PropTypes } from 'react';
import './instrument-string.scss';

export default class InstrumentString extends Component {
    static propTypes = {
        stringIndex: PropTypes.number,
        maxFret: PropTypes.number,
        minFret: PropTypes.number,
        string: PropTypes.shape({
            finger: PropTypes.number,
            fret: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    };

    static contextTypes = {
        onFretClick: PropTypes.func,
        isEditable: PropTypes.bool,
    };

    onFretClicked = (fret, stringIndex, isFretted, e) => {
        const { onFretClick } = this.context;
        onFretClick(stringIndex, fret, isFretted);
    };

    renderFret(isFretted, finger, index, clickableFrets) {
        const { stringIndex } = this.props;
        const frettedClass = isFretted ? 'mark' : '';
        return (
            <div className={`fret ${frettedClass}`} key={index}>
                {clickableFrets ? <span className='fret__click-area'
                    onClick={this.onFretClicked.bind(this, index + 1, stringIndex, isFretted)}
                    ></span> : '' }
                {isFretted ? <div className='dot'>{finger}</div> : ''}
            </div>
        );
    }

    render() {
        const { maxFret, minFret, string: { finger, fret } } = this.props;
        console.log(maxFret);
        const { onFretClick } = this.context;
        const clickableFrets = !!onFretClick;

        const isPlayed = fret !== 'X';
        const isFretted = parseInt(fret) !== 0;

        const frettedClass = isFretted ? '' : 'no-fret';
        const playedClass = isPlayed ? '' : 'unplayed';
        const stringMarker = isPlayed ? (isFretted ? '' : 'O') : 'X';
        const stringClass = frettedClass || playedClass;

        const fretArray = new Array(Math.max(maxFret, 4));
        fretArray.fill(0);
        return (
            <div className='instrument-string'>
                <span className={stringClass}>{stringMarker}</span>
                {fretArray.map((fretI, index) => {
                    const fretted = (index === fret - 1) && isFretted;
                    return this.renderFret(fretted, finger, index, clickableFrets);
                })}
            </div>
        );
    }
}
