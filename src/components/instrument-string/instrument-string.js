import React, { Component, PropTypes } from 'react';
import './instrument-string.scss';

export default class InstrumentString extends Component {
    static propTypes = {
        stringIndex: PropTypes.number,
        numFrets: PropTypes.number,
        minFret: PropTypes.number,
        string: PropTypes.shape({
            finger: PropTypes.number,
            fret: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    };

    static contextTypes = {
        onFretClick: PropTypes.func,
        onStringMarkerClick: PropTypes.func,
        isEditable: PropTypes.bool,
    };

    onFretClicked = (fret, stringIndex, isFretted, e) => {
        const { onFretClick } = this.context;
        onFretClick(stringIndex, fret, isFretted);
    };

    renderFret(isFretted, finger, index, clickableFrets) {
        const { stringIndex } = this.props;
        const { isEditable } = this.context;
        const frettedClass = isFretted ? 'mark' : '';
        return (
            <div className={`fret ${frettedClass}`} key={index}>
                {isEditable ? <span className='fret__click-area'
                    onClick={this.onFretClicked.bind(this, index + 1, stringIndex, isFretted)}
                    ></span> : '' }
                {isFretted ? <div className='dot'>{finger}</div> : ''}
            </div>
        );
    }

    render() {
        const { numFrets, minFret, string: { finger, fret }, stringIndex } = this.props;
        const { isEditable, onStringMarkerClick } = this.context;
        const isPlayed = fret !== 'X';
        const stringMarkerClickHandler = isEditable ?
            onStringMarkerClick.bind(this, stringIndex, !isPlayed) : null;

        const isFretted = parseInt(fret) !== 0;

        const frettedClass = isFretted ? '' : 'no-fret';
        const playedClass = isPlayed ? '' : 'unplayed';
        const stringMarker = isPlayed ? (isFretted ? '' : 'O') : 'X';
        const stringClass = frettedClass || playedClass;

        const fretArray = new Array(Math.max(numFrets, 4));
        fretArray.fill(0);
        return (
            <div className='instrument-string'>
                <span className={stringClass}
                    onClick={stringMarkerClickHandler}
                    >{stringMarker}</span>
                {fretArray.map((fretI, index) => {
                    const fretted = (index === fret - 1) && isFretted;
                    return this.renderFret(fretted, finger, index);
                })}
            </div>
        );
    }
}
