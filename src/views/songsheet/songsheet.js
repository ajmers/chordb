import React, { Component, PropTypes } from 'react';
import ChordCard from '../../components/chord-card/chord-card';
import SongsheetHeader from './songsheet-header';
import { Song } from './song';
import { connect } from 'react-redux';
import { songsheetToggled,
    songAdded,
    songSelected,
    chordRemovedFromSong,
    songTitleChanged,
    songsFetched } from '../../state/actions/songsheet-actions';
import './songsheet.scss';

class Songsheet extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        addingSong: PropTypes.bool,
        currentSong: PropTypes.object,
        fetchedSong: PropTypes.object,
        songs: PropTypes.array,
    };

    componentDidMount() {
        this.props.dispatch(songsFetched());
    }

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

    handleCloseClick = e => {
        const { dispatch } = this.props;
        dispatch(songsheetToggled());
    };

    handleAddSongClick = e => {
        const { dispatch } = this.props;
        dispatch(songAdded());
    };

    handleSongTitleChanged = title => {
        const { dispatch } = this.props;
        dispatch(songTitleChanged(title));
    };

    handleSelectSong = (song) => {
        const { dispatch } = this.props;
        dispatch(songSelected(song));
    };

    renderSongList = () => {
        const { songs } = this.props;
        return (
            <div className='songsheet__songs'>
                {songs.map((song, index) => {
                    return (
                        <div className='songsheet__song' key={index}
                            onClick={this.handleSelectSong.bind(this, song)}>
                            {song.title}
                        </div>
                    );
                })}
            </div>
        );
    };

    renderCurrentSong = () => {
        const { fetchedSong = {} } = this.props;
        const { chords = [], title } = fetchedSong;

        return (
            <div className='songsheet__songs'>
                {this.renderSongList()}
                <div className='songsheet__current-song'>
                    <div className='songsheet__song-title'>
                        {title}
                    </div>
                    <div className='songsheet__song-chords'>
                        {chords.map((chord, index) => {
                            return (<ChordCard
                                buttons={[]}
                                chord={chord} key={index}/>);
                        })}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { isOpen, addingSong,
            currentSong } = this.props;
        const { title, chords } = currentSong;
        const closedClass = isOpen ? '' : '--closed';
        return (
            <div className={`songsheet${closedClass}`}>
                <SongsheetHeader
                    title={title}
                    song={currentSong}
                    songIsUnsaved={addingSong}/>
                <Song chords={chords} />
            </div>
        );
    }
}

export default connect(state => ({
    isOpen: state.songsheets.isOpen,
    addingSong: state.songsheets.addingSong,
    currentSong: state.songsheets.currentSong,
    fetchedSong: state.songsheets.fetchedSong,

    songs: state.songsheets.songs,
}))(Songsheet);
