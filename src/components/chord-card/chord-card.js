import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Chord from '../';

import './chord-card.scss'

export default class ChordCard extends Component {
    render() {
        const { chord } = this.props;
        return (
            <Card className='chord-card'>
                <Chord chord={chord}/>
                <CardText className='chord-details'>
                    <div className='chord-name'>{chord.name}</div>
                    <div className='instrument-name'>{chord.instrument}</div>
                </CardText>
            </Card>
        );
    }
}
