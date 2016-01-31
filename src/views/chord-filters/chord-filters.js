import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';
import { instrumentOptions, tonicOptions, typeOptions } from '../../constants/chord-options';
import { filterChanged } from '../../state/actions/filter-actions';
import './chord-filters.scss';

const filterOptions = [instrumentOptions, tonicOptions, typeOptions];

class ChordFilters extends Component {
    static propTypes = {
        filters: PropTypes.object,
    };

    componentWillMount() {
        // Add an 'All' option to each filter.
        filterOptions.map(filter => {
            filter.options.push({ value: 'All', label: 'All' });
            filter.defaultValue = 'All';
        });
    }

    onFilterChange = (key, value) => {
        const { dispatch } = this.props;
        dispatch(filterChanged(key, value));
    };

    renderFilter = (filter, index) => {
        const { filters } = this.props;
        const value = filters[filter.name];
        return (
            <div className='search-filter' key={index}>
                <Dropdown
                    auto={true}
                    onChange={this.onFilterChange.bind(this, filter.name)}
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
