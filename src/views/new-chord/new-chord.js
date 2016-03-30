import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { validateChord } from '../../state/selectors/new-chord-selector';
import { instrumentOptions, tonicOptions, typeOptions } from '../../constants/chord-options';

import ChordCard from '../../components/chord-card/chord-card';
import {
    chordSaved,
    chordPropertyUpdated,
    fretClicked,
    stringMarkerClicked,
    addFretClicked,
    minFretChanged } from '../../state/actions/create-chord-actions';
import { createChordClosed } from '../../state/actions/app-actions';
import './new-chord.scss';

const chordOptions = [instrumentOptions, tonicOptions, typeOptions];
const chooseOneOption = [{ label: 'Choose one', value: 'Choose one' }];

class NewChordEntry extends Component {
    static propTypes = {
        chordProperties: PropTypes.object,
        chord: PropTypes.object,
        numFrets: PropTypes.number,
        chordCanSave: PropTypes.bool,
    };

    static childContextTypes = {
        onFretClick: PropTypes.func,
        onMinFretChange: PropTypes.func,
        onStringMarkerClick: PropTypes.func,
        isEditable: PropTypes.bool,
        onAddFretClick: PropTypes.func,
    };

    getChildContext() {
        return { onFretClick: this.onFretClick,
            isEditable: true,
            onMinFretChange: this.onMinFretChange,
            onStringMarkerClick: this.onStringMarkerClick,
            onAddFretClick: this.onAddFretClick,
        };
    }

    onMinFretChange = (value) => {
        const { dispatch, chord } = this.props;
        dispatch(minFretChanged(chord, value));
    };

    onFretClick = (string, fret, reset) => {
        const { dispatch, chord } = this.props;
        dispatch(fretClicked(string, fret, chord, reset));
    };

    onNameUpdated = value => {
        const { dispatch, chord } = this.props;
        dispatch(chordPropertyUpdated('name', value, chord));
    };

    onStringMarkerClick = (stringIndex, isPlayed) => {
        const { dispatch, chord } = this.props;
        dispatch(stringMarkerClicked(stringIndex, isPlayed, chord));
    };

    onAddFretClick = chordLength => {
        const { dispatch } = this.props;
        dispatch(addFretClicked(chordLength + 1));
    };

    onPickerChange = (key, value) => {
        const { dispatch, chord } = this.props;
        dispatch(chordPropertyUpdated(key, value, chord));
    };

    handleDrawerClick = e => {
        const { dispatch } = this.props;
        dispatch(createChordClosed());
    };

    handleChordSaved = () => {
        const { dispatch, chord } = this.props;
        dispatch(chordSaved(chord));
    };

    renderPicker = (picker, index) => {
        const { chordProperties: chordProps } = this.props;
        // Don't render pickers besides instrument until instrument is chosen.

        const value = chordProps[picker.name];
        const renderOption = chordProps.instrumentChosen || picker.name === 'instrument';
        return renderOption ? (
            <div className='new-chord-option' key={index}>
                <Dropdown
                    className='new-chord-option__dropdown'
                    auto={true}
                    onChange={this.onPickerChange.bind(this, picker.name)}
                    label={picker.name}
                    source={chooseOneOption.concat(picker.options)}
                    value={value || picker.defaultValue}
                  />
            </div>
        ) : '';
    };

    render() {
        const { chordCanSave, chordProperties: chordProps = {},
            chord, numFrets } = this.props;
        const { name = '' } = chordProps;
        return (
            <div className='new-chord-entry'>
                <div className='new-chord__header'>
                    <Button className='new-chord__close'
                        onClick={this.handleDrawerClick}
                        icon='close' inverted mini floating />

                    <Input className='new-chord__name'
                        onChange={this.onNameUpdated}
                        label='Chord name'
                        value={name}
                    />

                    {chordCanSave ? (
                        <Button className='new-chord__save'
                            icon='save'
                            onClick={this.handleChordSaved}
                            label='Save'
                            flat primary />) : ''}
                </div>
                <div className='new-chord__body'>
                    <div className='new-chord__options'>
                        {chordOptions.map(this.renderPicker)}
                    </div>
                    <div className='new-chord__grid'>
                        {chordProps.instrumentChosen ?
                            <ChordCard chord={chord} numFrets={numFrets} />
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return ({
        chordCanSave: validateChord(state),
        chordProperties: state.newChordProperties,
        chord: state.newChordProperties.inProgressChord,
        numFrets: state.newChordProperties.numFrets,
    });
})(NewChordEntry);
