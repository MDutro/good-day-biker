import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render( <App />, document.getElementById('root'));

// We want to change this before publishing, but read this first https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();