import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import { songsheetToggled, songAdded } from '../../state/actions/songsheet-actions';
import { DropTarget } from '../../utils/drag-and-drop';
import './songsheet.scss';

class Songsheet extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        addingSong: PropTypes.bool,
    };

    handleCloseClick = e => {
        const { dispatch } = this.props;
        dispatch(songsheetToggled());
    };

    handleAddSongClick = e => {
        const { dispatch } = this.props;
        dispatch(songAdded());
    };

    renderNewSong = () => {
        const { addingSong } = this.props;
        return addingSong ? (
            <DropTarget
                target={{ accepts: ['c'] }}
                className='songsheet__drop-chords'>
                <div className='songsheet-region__new-song'>
                    <Input className='new-song__title'
                        label='Song title' />
                </div>
            </DropTarget>
        ) : '';
    };

    render() {
        const { isOpen } = this.props;
        const closedClass = isOpen ? '' : '--closed';
        return (
            <div className={`songsheet-region${closedClass}`}>
                <div className='songsheet-region__header'>
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
}))(Songsheet);
