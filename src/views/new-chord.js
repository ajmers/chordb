import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { instrumentFilter, tonicFilter, typeFilter } from '../constants/filter-options';

const instrumentTemplates = {
    guitar: 6,
    mandolin: 4,
    banjo: 5,
};

const filterOptions = [instrumentFilter, tonicFilter, typeFilter];

class NewChordEntry extends Component {
    static propTypes = {
        pickers: PropTypes.object,
    };

    onPickerChange = (handler, value) => {
        const { dispatch } = this.props;
        dispatch(handler(value));
    };

    renderPicker = (picker, index) => {
        const { pickers } = this.props;
        const value = filters[filter.name];
        return (
            <div className='search-filter' key={index}>
                <Dropdown
                    auto={true}
                    onChange={this.onFilterChange.bind(this, filter.onChange)}
                    label={filter.name}
                    source={filter.options}
                    value={value || filter.defaultValue}
                  />
            </div>
        );
    };

    render() {
        return (
            <div className='new-chord-entry'>
                <div className='new-chord-options'>
                    {filterOptions.map(this.renderPicker)}
                </div>
                <div className='new-chord-grid'>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return ({ filters: state.filters });
})(NewChordEntry);
