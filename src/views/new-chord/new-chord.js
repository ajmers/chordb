import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { instrumentOptions, tonicOptions, typeOptions } from '../../constants/chord-options';

import ChordCard from '../../components/chord-card/chord-card';
import { chordPropertyUpdated, fretClicked } from '../../state/actions/add-chord-actions';
import './new-chord.scss';

const chordOptions = [instrumentOptions, tonicOptions, typeOptions];

class NewChordEntry extends Component {
    static propTypes = {
        chordProperties: PropTypes.object,
        chord: PropTypes.object,
    };

    static childContextTypes = {
        onFretClick: PropTypes.func,
        isEditable: PropTypes.bool,
    };

    onFretClick = (string, fret, reset) => {
        const { dispatch, chord } = this.props;
        dispatch(fretClicked(string, fret, chord, reset));
    };

    getChildContext() {
        return { onFretClick: this.onFretClick, isEditable: true };
    }

    componentWillMount() {
        chordOptions.map(option => {
            option.options.push({ value: 'Choose one', label: 'Choose one' });
            option.defaultValue = 'Choose one';
        });
    }

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
        const { chordProperties: chordProps, chord } = this.props;
        if (!chordProps.instrumentChosen) {
            return '';
        } else {
            return <ChordCard chord={chord} />;
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
    });
})(NewChordEntry);
