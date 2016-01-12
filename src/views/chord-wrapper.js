import React, { Component, PropTypes } from 'react';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export default class ChordWrapper extends Component {
    render() {
        return (
            <div id='chord-wrapper'>
                <Card style={{width: '350px'}}>
                    <CardTitle
                        avatar='https://placeimg.com/80/80/animals'
                        title='Chord: Gb'
                        subtitle='Gb minor'
                    />
                    <CardMedia
                        aspectRatio='wide'
                        image='https://placeimg.com/800/450/nature'
                    />
                    <CardTitle
                        title='This is a chord'
                        subtitle='here is the chord'
                    />
                    <CardText>Gb Minor!</CardText>
                </Card>
            </div>
        );
    }
}
