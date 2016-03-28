import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import ChordCard from '../../components/chord-card/chord-card';
import { connect } from 'react-redux';
import { songsheetToggled, songAdded, songTitleChanged, songSaved } from '../../state/actions/songsheet-actions';
import './songsheet.scss';

class Songsheet extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        addingSong: PropTypes.bool,
        currentSongChords: PropTypes.array,
        currentSong: PropTypes.object,
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

    renderNewSong = () => {
        const { addingSong, currentSongChords } = this.props;
        return addingSong ? (
            <div className='songsheet__drop-chords'>
                <div className='songsheet-region__new-song'>
                    <Input className='new-song__title'
                        onChange={this.handleSongTitleChanged}
                        label='Song title' />
                </div>
                <div className='songsheet-region__chords'>
                    {currentSongChords.map((chord, index) => {
                        return (<ChordCard
                            chord={chord} key={index}/>);
                    })}
                </div>
            </div>
        ) : '';
    };

    render() {
        const { isOpen, currentSongChords } = this.props;
        const closedClass = isOpen ? '' : '--closed';
        return (
            <div className={`songsheet-region${closedClass}`}>
                <div className='songsheet-region__header'>
                    { currentSongChords.length ? (
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
                {this.renderNewSong()}
            </div>
        );
    }
}

export default connect(state => ({
    isOpen: state.songsheets.isOpen,
    addingSong: state.songsheets.addingSong,
    currentSongTitle: state.songsheets.currentSong.title,
    currentSongChords: state.songsheets.currentSong.chords,
    currentSong: state.songsheets.currentSong,
}))(Songsheet);
