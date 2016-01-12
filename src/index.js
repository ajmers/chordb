import 'babel-polyfill';
import ChordWrapper from './views/chord-wrapper';

/* React and Redux */
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <ChordWrapper />,
    document.getElementById('app-wrapper')
);
