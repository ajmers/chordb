import React, { Component, PropTypes } from 'react';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Chord from './chord';

const fs6 = {
    name: 'f#6',
    bar: false,
    minFret: 3,
    instrument: 'mandolin',
    fingerings: [
        { string: 'G', fret: 3 },
        { string: 'D', fret: 1 },
        { string: 'A', fret: 4 },
        { string: 'E', fret: 2 },
    ],
};

const dm = {
    name: 'dm',
    bar: true,
    instrument: 'mandolin',
    fingerings: [
        { string: 'G', fret: 2 },
        { string: 'D', fret: 3 },
        { string: 'A', fret: 5 },
        { string: 'E', fret: 'X' },
    ],
};

const g = {
    name: 'G',
    instrument: 'mandolin',
    fingerings: [
        { string: 'G', fret: 0 },
        { string: 'D', fret: 0 },
        { string: 'A', fret: 2 },
        { string: 'E', fret: 1 },
    ],
};

export default class ChordWrapper extends Component {
    render() {
        return (
            <div className='chords'>
                <div id='chord-wrapper'>
                    <Card style={{width: '350px'}}>
                        <Chord chord={fs6}/>
                        <CardText>d minor</CardText>
                    </Card>
                    <Card style={{width: '350px'}}>
                        <Chord chord={g}/>
                        <CardText>G major</CardText>
                    </Card>
                </div>
            </div>
        );
    }
}
