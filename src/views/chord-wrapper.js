import React, { Component, PropTypes } from 'react';
import ChordCard from './chord-card';
import './chord-wrapper.scss';

const mandoFs6 = {
    name: 'Mandolin f#6',
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

const mandoDm = {
    name: 'Mandolin dm',
    bar: true,
    instrument: 'mandolin',
    fingerings: [
        { string: 'G', fret: 2 },
        { string: 'D', fret: 3 },
        { string: 'A', fret: 5 },
        { string: 'E', fret: 'X' },
    ],
};

const mandoG = {
    name: 'Mandolin G',
    instrument: 'mandolin',
    fingerings: [
        { string: 'G', fret: 0 },
        { string: 'D', fret: 0 },
        { string: 'A', fret: 2 },
        { string: 'E', fret: 1 },
    ],
};

const guitarG = {
    name: 'Guitar G',
    instrument: 'guitar',
    fingerings: [
        { string: 'E', fret: 3 },
        { string: 'A', fret: 2 },
        { string: 'D', fret: 0 },
        { string: 'G', fret: 0 },
        { string: 'B', fret: 0 },
        { string: 'E', fret: 3 },
    ],
};

export default class ChordWrapper extends Component {
    render() {
        return (
            <div className='chords'>
                <div id='chord-wrapper'>
                    <ChordCard chord={mandoG}/>
                    <ChordCard chord={mandoDm}/>
                    <ChordCard chord={mandoFs6}/>
                    <ChordCard chord={guitarG}/>
                </div>
            </div>
        );
    }
}
