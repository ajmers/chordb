import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ChordChart from '../chord-chart/chord-chart';

import './chord-card.scss';

export default class ChordCard extends Component {
    render() {
        const { chord } = this.props;
        return (
            <Card className='chord-card'>
                <ChordChart chord={chord}/>
                <CardText className='chord-details'>
                    <div className='chord-name'>{chord.name}</div>
                    <div className='instrument-name'>{chord.instrument}</div>
                </CardText>
            </Card>
        );
    }
}
