import React, { Component, PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Chord from './chord';

export default class ChordCard extends Component {
    render() {
        const { chord } = this.props;
        return (
            <Card>
                <Chord chord={chord}/>
                <CardText>{chord.name}</CardText>
            </Card>
        );
    }
}
