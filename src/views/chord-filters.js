import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { instrumentFilter, tonicFilter, typeFilter } from '../constants/filter-options';

import './chord-filters.scss';

const filterOptions = [instrumentFilter, tonicFilter, typeFilter];

class ChordFilters extends Component {
    static propTypes = {
        filters: PropTypes.object,
    };

    onFilterChange = (handler, value) => {
        const { dispatch } = this.props;
        dispatch(handler(value));
    };

    renderFilter = (filter, index) => {
        const { filters } = this.props;
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
            <div className='search-filters'>
            {filterOptions.map(this.renderFilter)}
            </div>
        );
    }
}

export default connect(state => {
    return ({ filters: state.filters });
})(ChordFilters);
