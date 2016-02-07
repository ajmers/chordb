import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { filteredChordSelector } from '../state/reducers/chord-selector';

import ChordCard from '../components/chord-card/chord-card';

import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import { Draggable, DropTarget } from '../utils/drag-and-drop';
//import Draggable from 'react-draggable';
import Songsheet from './songsheet/songsheet';
import NewChordEntry from './new-chord/new-chord';
import ChordFilters from './chord-filters/chord-filters';

import { fetchChords } from '../state/actions/chord-actions';
import { addChordOpened } from '../state/actions/app-actions';
import { songsheetToggled } from '../state/actions/songsheet-actions';

import './app-wrapper.scss';

class AppWrapper extends Component {
    static propTypes = {
        addChordOpen: PropTypes.bool.isRequired,
        filteredChords: PropTypes.arrayOf(PropTypes.object),
        songsheetsAreOpen: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            deltaPosition: {
                top: 0, left: 0,
            },
            activeDrags: 0,
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchChords());
    }

    handleAddChordClick = e => {
        const { dispatch } = this.props;
        dispatch(addChordOpened());
    };

    handleSongsheetsClicked = e => {
        const { dispatch } = this.props;
        dispatch(songsheetToggled());
    };

    renderOpenSongsheetButton = isOpen => {
        return isOpen ? '' :
            (<div className='songsheet-button'>
                <Button icon='library_music'
                    label='Songsheets'
                    onClick={this.handleSongsheetsClicked}
                    flat primary />
            </div>);
    };

    handleDrag = (e, ui) => {
        var {left, top} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                left: left + ui.deltaX,
                top: top + ui.deltaY,
            }
        });
    };

    handleStop(chord) {
        console.log('stop dragging', chord);
    }

    renderChord = (chord, index) => {
        const { addingSong } = this.props;
        const style = {
            width: 20,
            height: 20,
            backgroundColor: 'lightblue',
        };
        return addingSong ?
            ( <Draggable className='draggable-chord-container'
                ref={`draggable-chord-${index}`}
                key={index}
				zIndex={100}
				onDrag={this.handleDrag}
				onDragStop={this.handleStop.bind(this, chord)}>
                    <ChordCard className='draggable-chord'
                        chord={chord} key={index}/>
            </Draggable> ) : (
            <ChordCard
                chord={chord} key={index}/>
            );
    };

    render() {
        const { filteredChords: chords = [], addChordOpen,
            songsheetsAreOpen } = this.props;
        return (
            <div className='app-layout'>
                <Songsheet isOpen={songsheetsAreOpen}/>

                <div className='chords-selection'>
                    <div className='controls'>
                        {this.renderOpenSongsheetButton(songsheetsAreOpen)}

                        <div className='filters'>
                            <ChordFilters />
                        </div>

                        <div className='add-chord-button'>
                            <Button icon='add'
                                label='Add chord'
                                onClick={this.handleAddChordClick}
                                flat primary />
                        </div>
                    </div>
                    <div className='chords'>
                        {chords.map((chord, index) => {
                            return this.renderChord(chord, index);
                        })}
                    </div>
                </div>
                <Drawer active={addChordOpen}
                    type='right'
                    className='add-chord-region'
                    onOverlayClick={this.handleDrawerClick}>
                        <NewChordEntry {...this.props} />
                </Drawer>
            </div>
        );
    }
}

export default connect(state => ({
    addChordOpen: state.app.addChordOpen,
    filteredChords: filteredChordSelector(state),
    songsheetsAreOpen: state.songsheets.isOpen,
    addingSong: state.songsheets.addingSong,
}))(AppWrapper);
