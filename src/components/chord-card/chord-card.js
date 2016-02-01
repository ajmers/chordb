import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import ChordChart from '../chord-chart/chord-chart';

import './chord-card.scss';

export default class ChordCard extends Component {
    static propTypes = {
        chord: PropTypes.object,
    };

    static contextTypes = {
        isEditable: PropTypes.bool,
        onAddFretClick: PropTypes.func,
    };

    getNumFrets(chord) {
        return Math.max.apply(null, chord.fingerings.map(string => {
            return parseInt(string.fret) ? string.fret : 0;
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

    render() {
        const { chord, numFrets } = this.props;
        const totalFrets =
            numFrets || Math.max(this.getNumFrets(chord), 4);
        return (
            <Card className='chord-card'>
                <CardTitle className='chord-title'>
                    <div className='chord-name'>{chord.name}</div>
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
