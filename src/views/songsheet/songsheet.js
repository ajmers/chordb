import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import ChordCard from '../../components/chord-card/chord-card';
import { connect } from 'react-redux';
import { songsheetToggled, songAdded, songSelected, chordRemovedFromSong,
    songTitleChanged, songSaved, songsFetched } from '../../state/actions/songsheet-actions';
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

    handleSongSaved = () => {
        const { dispatch, currentSong } = this.props;
        dispatch(songSaved(currentSong));
    };

    handleSelectSong = (song) => {
        const { dispatch } = this.props;
        dispatch(songSelected(song));
    };

    renderNewSong = () => {
        const { addingSong, currentSong: { chords } } = this.props;
        return addingSong ? (
            <div className='songsheet__chords'>
                <div className='songsheet-region__new-song'>
                    <Input className='new-song__title'
                        onChange={this.handleSongTitleChanged}
                        label='Song title' />
                </div>
                <div className='songsheet-region__chords'>
                    {chords.map((chord, index) => {
                        return (<ChordCard
                            buttons={this.getCardButtons.call(this, chord)}
                            chord={chord} key={index}/>);
                    })}
                </div>
            </div>
        ) : '';
    };

    renderSongList = () => {
        const { songs } = this.props;
        return (
            <div className='songsheet__songs'>
                {songs.map(song => {
                    return (
                        <div className='songsheet__song'
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
        const { isOpen, addingSong, currentSong: { chords } } = this.props;
        const closedClass = isOpen ? '' : '--closed';
        return (
            <div className={`songsheet-region${closedClass}`}>
                <div className='songsheet-region__header'>
                    { chords.length ? (
                        <Button className='new-song__save'
                            icon='save'
                            onClick={this.handleSongSaved}
                            label='Save'
                            flat primary />) : '' }
                    <Button className='songsheet-region__add-song'
                        onClick={this.handleAddSongClick}
                        icon='add' inverted mini floating />

                    <Button className='songsheet-region__close'
                        onClick={this.handleCloseClick}
                        icon='close' inverted mini floating />
                </div>
                { addingSong ? this.renderNewSong :
                        this.renderCurrentSong() }
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
