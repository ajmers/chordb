import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filteredChordSelector } from '../../state/reducers/chord-selector';

import ChordCard from '../../components/chord-card/chord-card';

import { fetchChords } from '../../state/actions/chord-actions';
import { chordAddedToSong } from '../../state/actions/songsheet-actions';

import './library.scss';

class Library extends Component {
    static propTypes = {
        addingSong: PropTypes.bool,
        filteredChords: PropTypes.arrayOf(PropTypes.object),
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchChords());
    }

    handleAddChordToSong = chord => {
        const { dispatch } = this.props;
        dispatch(chordAddedToSong(chord));
    };

    render() {
        const { addingSong, filteredChords: chords = [] } = this.props;
        const buttons = addingSong ? [{
            icon: 'add',
            onClick: this.handleAddChordToSong,
        }] : [];
        return (
            <div className='chord-library'>
                {chords.map((chord, index) => (
                    <ChordCard
                        buttons={buttons}
                        chord={chord} key={index}/>
                ))}
            </div>
        );
    }
}

export default connect(state => ({
    filteredChords: filteredChordSelector(state),
    addingSong: state.songsheets.addingSong,
}))(Library);
