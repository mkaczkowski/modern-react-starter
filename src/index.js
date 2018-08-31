import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.SERVICE_WORKER === 'true') {
// eslint-disable-next-line global-require
  const registerServiceWorker = require('./registerServiceWorker').default;
  registerServiceWorker();
}
