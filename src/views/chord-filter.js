import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';
import { connect } from 'react-redux';

const instrumentOptions = [
  { value: 'Guitar', label: 'Guitar' },
  { value: 'Mandolin', label: 'Mandolin'},
];

class ChordFilters extends Component {

    render() {
        const { chords } = this.props;
        return (
            <Dropdown
                auto={true}
                source={instrumentOptions}
                value='mandolin'
              />
        );
    }
}

export default connect(state => ({ chords: state.chords }))(ChordFilters);
