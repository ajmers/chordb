import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { instrumentOptions, tonicOptions, typeOptions } from '../constants/chord-options';
import { Chord } from '../classes/chord';
import { chordPropertyUpdated } from '../state/actions/add-chord-actions';
import './new-chord.scss';

const instrumentTemplates = {
    guitar: 6,
    mandolin: 4,
    banjo: 5,
};

const chordOptions = [instrumentOptions, tonicOptions, typeOptions];

class NewChordEntry extends Component {
    static propTypes = {
        chordProperties: PropTypes.object,
    };

    componentWillMount() {
        chordOptions.map(option => {
            option.options.push({ value: 'Choose one', label: 'Choose one' });
            option.defaultValue = 'Choose one';
        });
        this.chord = new Chord('');
    }

    onPickerChange = (key, value) => {
        const { dispatch } = this.props;
        dispatch(chordPropertyUpdated(key, value));
    };

    renderPicker = (picker, index) => {
        const { chordProperties } = this.props;
        const value = chordProperties[picker.name];
        return (
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
        );
    };

    render() {
        return (
            <div className='new-chord-entry'>
                <div className='new-chord-options'>
                    {chordOptions.map(this.renderPicker)}
                </div>
                <div className='new-chord-grid'>

                </div>
            </div>
        );
    }
}

export default connect(state => {
    return ({ chordProperties: state.newChordProperties });
})(NewChordEntry);
