import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filteredChordSelector } from '../state/reducers/chord-selector';

import ChordCard from '../components/chord-card/chord-card';
import ChordFilters from './chord-filter';

import { fetchChords } from '../state/actions/chord-actions';

import './app-wrapper.scss';

class AppWrapper extends Component {
    static propTypes = {
        filteredChords: PropTypes.arrayOf(PropTypes.object),
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchChords());
    }

    render() {
        const { filteredChords: chords = [] } = this.props;
        return (
            <div>
                <div className='filters'>
                    <ChordFilters />
                </div>
                <div className='chords'>
                    {chords.map((chord, index) => {
                        return (<ChordCard
                            chord={chord} key={index}/>);
                    })}
                </div>
            </div>
        );
    }
}

export default connect(state => ({ filteredChords: filteredChordSelector(state) }))(AppWrapper);
