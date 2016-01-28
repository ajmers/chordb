import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filteredChordSelector } from '../state/reducers/chord-selector';

import { ChordCard } from '../components/chord-card/chord-card';

import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import NewChordEntry from './new-chord';
import ChordFilters from './chord-filters';

import { fetchChords } from '../state/actions/chord-actions';
import { addChordOpened, addChordClosed } from '../state/actions/app-actions';

import './app-wrapper.scss';

class AppWrapper extends Component {
    static propTypes = {
        addChordOpen: PropTypes.bool.isRequired,
        filteredChords: PropTypes.arrayOf(PropTypes.object),
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchChords());
    }

    handleAddChordClick = e => {
        const { dispatch } = this.props;
        dispatch(addChordOpened());
    };

    handleDrawerClick = e => {
        const { dispatch } = this.props;
        dispatch(addChordClosed());
    };

    render() {
        const { filteredChords: chords = [], addChordOpen } = this.props;
        console.log(NewChordEntry, ChordCard);
        return (
            <div>
                <div className='controls'>
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

                <Drawer active={addChordOpen}
                    type='right'
                    className='add-chord-region'
                    onOverlayClick={this.handleDrawerClick}>
                        <Button className='close-add-chord'
                            onClick={this.handleDrawerClick}
                            icon='close' inverted mini floating />
                        <NewChordEntry {...this.props} />
                </Drawer>

                <div className='chords'>
                    {chords.map((chord, index) => {
                        return (<ChordCard
                            chord={chord} key={index}/>);
                    })}
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    addChordOpen: state.app.addChordOpen,
    filteredChords: filteredChordSelector(state),
}))(AppWrapper);
