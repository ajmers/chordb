import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import './chord-filters.scss';

const allFilter = [{ value: 'All', label: 'All' }];

export class ChordFilter extends Component {
    static propTypes = {
        filter: PropTypes.object,
        value: PropTypes.string,
        onChange: PropTypes.func,
    };

    render() {
        const { filter, value, onChange } = this.props;
        return (
            <div className='search-filter'>
                <Dropdown
                    auto={true}
                    onChange={onChange.bind(this, filter.name)}
                    label={filter.name}
                    template={this.customFilter}
                    source={allFilter.concat(filter.options)}
                    value={value || filter.defaultValue}
                  />
            </div>
        );
    }
}
