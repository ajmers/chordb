import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { instrumentOptions, tonicOptions, typeOptions } from '../../constants/chord-options';

import ChordCard from '../../components/chord-card/chord-card';
import { chordPropertyUpdated, fretClicked, stringMarkerClicked, addFretClicked } from '../../state/actions/add-chord-actions';
import './new-chord.scss';

const chordOptions = [instrumentOptions, tonicOptions, typeOptions];

class NewChordEntry extends Component {
    static propTypes = {
        chordProperties: PropTypes.object,
        chord: PropTypes.object,
        numFrets: PropTypes.number,
    };

    static childContextTypes = {
        onFretClick: PropTypes.func,
        onStringMarkerClick: PropTypes.func,
        isEditable: PropTypes.bool,
        onAddFretClick: PropTypes.func,
    };

    getChildContext() {
        return { onFretClick: this.onFretClick,
            isEditable: true,
            onStringMarkerClick: this.onStringMarkerClick,
            onAddFretClick: this.onAddFretClick,
        };
    }

    componentWillMount() {
        chordOptions.map(option => {
            option.options.push({ value: 'Choose one', label: 'Choose one' });
            option.defaultValue = 'Choose one';
        });
    }

    onFretClick = (string, fret, reset) => {
        const { dispatch, chord } = this.props;
        dispatch(fretClicked(string, fret, chord, reset));
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

    renderPicker = (picker, index) => {
        const { chordProperties: chordProps } = this.props;
        // Don't render pickers besides instrument until instrument is chosen.

        const value = chordProps[picker.name];
        const renderOption = chordProps.instrumentChosen || picker.name === 'instrument';
        return renderOption ? (
            <div className='search-filter' key={index}>
                <Dropdown
                    className='search-filter__dropdown'
                    auto={true}
                    onChange={this.onPickerChange.bind(this, picker.name)}
                    label={picker.name}
                    source={picker.options}
                    value={value || picker.defaultValue}
                  />
            </div>
        ) : '';
    };

    renderChart = () => {
        const { chordProperties: chordProps, chord, numFrets } = this.props;
        if (!chordProps.instrumentChosen) {
            return '';
        } else {
            return <ChordCard chord={chord} numFrets={numFrets} />;
        }
    };

    render() {
        return (
            <div className='new-chord-entry'>
                <div className='new-chord__options'>
                    {chordOptions.map(this.renderPicker)}
                </div>
                <div className='new-chord__grid'>
                    {this.renderChart()}
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return ({
        chordProperties: state.newChordProperties,
        chord: state.newChordProperties.inProgressChord,
        numFrets: state.newChordProperties.numFrets,
    });
})(NewChordEntry);
