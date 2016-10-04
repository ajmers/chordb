import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filteredChordSelector } from '../state/selectors/chord-selector';

import Library from './library/library';

import { Button } from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Dialog from 'react-toolbox/lib/dialog';

import SongsheetWrapper from './songsheet/songsheet-wrapper';
import NewChordEntry from './new-chord/new-chord';
import ChordFilters from './chord-filters/chord-filters';

import { createChordOpened } from '../state/actions/app-actions';
import { songsheetToggled } from '../state/actions/songsheet-actions';

import './app-wrapper.scss';

class AppWrapper extends Component {
    static propTypes = {
        addingSong: PropTypes.bool,
        createChordOpen: PropTypes.bool.isRequired,
        filteredChords: PropTypes.arrayOf(PropTypes.object),
        songsheetsAreOpen: PropTypes.bool,
    };

    handleCreateChordClick = e => {
        const { dispatch } = this.props;
        dispatch(createChordOpened());
    };

    handleSongsheetsClicked = e => {
        const { dispatch } = this.props;
        dispatch(songsheetToggled());
    };

    render() {
        const { filteredChords: chords = [], createChordOpen,
            songsheetsAreOpen } = this.props;
        return (
            <div className='app-layout'>
                <AppBar className='app-menu-bar' fixed flat>
                    <div className='controls'>
                        <div className='open-songsheets-button'>
                            {songsheetsAreOpen ? null :
                                <Button icon='library_music'
                                    label='Songsheets'
                                    onClick={this.handleSongsheetsClicked}
                                    flat primary />
                            }
                        </div>

                        <div className='filters'>
                            <ChordFilters />
                        </div>

                        <div className='create-chord-button'>
                            <Button icon='add'
                                label='Create chord'
                                onClick={this.handleCreateChordClick}
                                flat primary />
                        </div>
                    </div>
                </AppBar>

                <SongsheetWrapper isOpen={songsheetsAreOpen}/>

                <Library chords={chords} />

                <Dialog active={createChordOpen}
                    type='right'
                    className='create-chord-region'
                    onOverlayClick={this.handleDrawerClick}>
                        <NewChordEntry {...this.props} />
                </Dialog>
            </div>
        );
    }
}

export default connect(state => ({
    createChordOpen: state.app.createChordOpen,
    filteredChords: filteredChordSelector(state),
    songsheetsAreOpen: state.songsheets.isOpen,
    songs: state.songsheets.songs,
    addingSong: state.songsheets.addingSong,
}))(AppWrapper);
