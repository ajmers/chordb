import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class SongSheet extends Component {
    static propTypes = {
        chordProperties: PropTypes.object,
        chord: PropTypes.object,
        numFrets: PropTypes.number,
        chordCanSave: PropTypes.bool,
    };

    render() {
        return <div>SONGSHEET!</div>
    };
}
