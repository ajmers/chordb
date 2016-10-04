import React, { Component, PropTypes } from 'react';
import ChordCard from '../../components/chord-card/chord-card';
import { chordRemovedFromSong } from '../../state/actions/songsheet-actions';

export class Song extends Component {
    static propTypes = {
        song: PropTypes.object,
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
        const { song: { chords } } = this.props;
        return (
            <div className='current-song'>
                <div className='current-song__chords'>
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
