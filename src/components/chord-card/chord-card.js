import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import ChordChart from '../chord-chart/chord-chart';

import './chord-card.scss';

export default class ChordCard extends Component {
    static propTypes = {
        chord: PropTypes.object,
        isEditable: PropTypes.bool,
    };

    render() {
        const { chord } = this.props;
        return (
            <Card className='chord-card'>
                <CardTitle className='chord-title'>
                    <div className='chord-name'>{chord.name}</div>
                </CardTitle>
                <ChordChart chord={chord}/>
                <CardText className='chord-details'>
                    <div className='instrument-name'>{chord.instrument}</div>
                </CardText>
            </Card>
        );
    }
}
