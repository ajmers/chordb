import React, { Component, PropTypes } from 'react';
import './other-name.scss';

export default class InstrumentString extends Component {
    renderFret(isFretted) {
        const frettedClass = isFretted ? 'mark' : '';
        return (
            <div className={`fret ${frettedClass}`}>
            </div>
        );
    }
    render() {
        const { maxFret } = this.props;
        const { fret } = this.props.string;
        const fretArray = new Array(maxFret);
        fretArray.fill(0);
        return (
            <div className={`string fret-${fret}`}>
                {fretArray.map((fretI, index) => {
                    console.log(fretI, index);
                    return this.renderFret(index === fret);
                })}
            </div>
        );
    }
}
