import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Core from './dummyCore.js';

const core = new Core({runningTime: 100000});

ReactDOM.render(<App core={core}/>, document.getElementById('root'));
registerServiceWorker();