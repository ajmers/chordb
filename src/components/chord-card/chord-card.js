import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Chord from '../chord/chord';

import './chord-card.scss'

export default class ChordCard extends Component {
    render() {
        const { chord } = this.props;
        return (
            <Card>
                <Chord chord={chord}/>
                <CardText>
                    <div className='chord-name'>Chord: {chord.name}</div>
                    <div className='instrument-name'>{chord.instrument}</div>
                </CardText>
            </Card>
        );
    }
}
