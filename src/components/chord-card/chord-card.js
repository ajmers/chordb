import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import ChordChart from '../chord-chart/chord-chart';

const flatSign = String.fromCharCode(0x266d);
const sharpSign = String.fromCharCode(0x266f);

import './chord-card.scss';

export default class ChordCard extends Component {
    static propTypes = {
        addingSong: PropTypes.bool,
        chord: PropTypes.object,
        numFrets: PropTypes.number,
    };

    static contextTypes = {
        isEditable: PropTypes.bool,
        onAddFretClick: PropTypes.func,
    };

    getNumFrets(chord) {
        return Math.max.apply(null, chord.fingerings.map(string => {
            return parseInt(string.fret, 10) ? string.fret : 0;
        }));
    }

    renderAddFretsButton = (numFrets) => {
        const { isEditable, onAddFretClick } = this.context;
        const canAddFrets = numFrets <= 5;
        return isEditable && canAddFrets ? (
            <Button icon='add'
                className='add-more-frets-button'
                label='Add fret'
                onClick={onAddFretClick.bind(this, numFrets)}
                flat primary />
        ) : '';
    };

    renderChordName(name) {
        let modifiedName = name.replace(/\#/g, sharpSign);
        modifiedName = modifiedName.replace(/b\b/g, flatSign);
        return modifiedName;
    }

    render() {
        const { chord, numFrets } = this.props;
        const totalFrets =
            numFrets || Math.max(this.getNumFrets(chord), 4);
        return (
            <Card className='chord-card'>
                <CardTitle className='chord-title'>
                    <div className='chord-name'>{this.renderChordName(chord.name)}</div>
                </CardTitle>
                <ChordChart chord={chord}
                    numFrets={totalFrets}/>

                {this.renderAddFretsButton(totalFrets)}
                <CardText className='chord-details'>
                    <div className='instrument-name'>{chord.instrument}</div>
                </CardText>
            </Card>
        );
    }
}
