import React, { Component, PropTypes } from 'react';
import ChordCard from './chord-card';
import $ from 'jquery';
import './chord-wrapper.scss';

export default class ChordWrapper extends Component {
    render() {
        let chords = [];
        $.ajax({
            url: 'http://localhost:8080/api/chords',
            success: function(res) {
                chords = res;
            }
        })

        return (
            <div className='chords'>
                <div id='chord-wrapper'>
                    {chords.map(chord => {
                        return <ChordCard chord={chord}/>
                     })}
                </div>
            </div>
        );
    }
}
