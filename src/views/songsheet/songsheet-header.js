import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { songsheetToggled,
    songSaved,
    songAdded } from '../../state/actions/songsheet-actions';

class SongsheetHeader extends Component {
    static propTypes = {
        songIsUnsaved: PropTypes.bool,
        title: PropTypes.string,
        song: PropTypes.object,
    };

    handleCloseClick = e => {
        const { dispatch } = this.props;
        dispatch(songsheetToggled());
    };

    handleAddSongClick = e => {
        const { dispatch } = this.props;
        dispatch(songAdded());
    };

    handleSongSaved = () => {
        const { dispatch, song } = this.props;
        dispatch(songSaved(song));
    };

    renderSongTitle = () => {
        const { songIsUnsaved, song } = this.props;
        return (
            <div className='songsheet__title'>
                {songIsUnsaved ? (
                    <Input className='new-song__title'
                        onChange={this.handleSongTitleChanged}
                        label='Song title' />) : <span>{song.title}</span>
                }
            </div>
        );
    };

    render() {
        const { song } = this.props;
        return (
            <div className='songsheet__header'>
                {this.renderSongTitle()}
                <div className='songsheet__controls'>
                { song.chords.length ? (
                    <Button className='new-song__save'
                        icon='save'
                        onClick={this.handleSongSaved.bind(this, song)}
                        label='Save'
                        flat floating primary />) : '' }
                    <Button className='songsheet__add-song'
                        onClick={this.handleAddSongClick}
                        icon='add' flat mini accent />

                    <Button className='songsheet__close'
                        onClick={this.handleCloseClick}
                        icon='close' flat mini accent />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
}))(SongsheetHeader);
