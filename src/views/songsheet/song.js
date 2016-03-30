import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import ChordCard from '../../components/chord-card/chord-card';
import { connect } from 'react-redux';
import { songsheetToggled,
    chordRemovedFromSong } from '../../state/actions/songsheet-actions';

export class Song extends Component {
    static propTypes = {
        chords: PropTypes.array,
    };

    getCardButtons = (chord) => {
        return [{
            icon: 'delete',
            onClick: this.handleRemoveChordFromSong.bind(this, chord),
        }];
    };

    handleRemoveChordFromSong = (chord) => {
        const { dispatch } = this.props;
        dispatch(chordRemovedFromSong(chord));
    };

    render() {
        const { chords } = this.props;
        return (
            <div className='songsheet__song'>
                <div className='songsheet__chords'>
                    {chords.map((chord, index) => {
                        return (<ChordCard
                            buttons={[]}
                            chord={chord} key={index}/>);
                    })}
                </div>
            </div>
        );
    }
}
