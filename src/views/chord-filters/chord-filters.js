import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ChordFilter } from './chord-filter';
import { instrumentOptions, tonicOptions, typeOptions } from '../../constants/chord-options';
import { filterChanged } from '../../state/actions/filter-actions';
import './chord-filters.scss';

const filterOptions = [instrumentOptions, tonicOptions, typeOptions];

class ChordFilters extends Component {
    static propTypes = {
        filters: PropTypes.object,
    };

    onFilterChange = (key, value) => {
        const { dispatch } = this.props;
        dispatch(filterChanged(key, value));
    };

    render() {
        const { filters } = this.props;
        return (
            <div className='search-filters'>
                {filterOptions.map((filter, index) => {
                    const value = filters[filter.name];
                    return (
                        <ChordFilter key={index}
                            value={value}
                            onChange={this.onFilterChange}
                            filter={filter}
                            />
                        );
                })}
            </div>
        );
    }
}

export default connect(state => {
    return ({ filters: state.filters });
})(ChordFilters);
