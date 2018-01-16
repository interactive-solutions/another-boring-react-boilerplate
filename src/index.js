import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Make sure this is imported above App, so the global styles end up first in the build
import './css/global.scss';

import store from './redux/store';
import App from './components/App';

// Add service worker in production
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Create root component and mount
const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(root, document.getElementById('react-root'));
