import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Raven from 'raven-js';

// Make sure this is imported above App, so the global styles end up first in the build
import './css/global.scss';

import store from './redux/store';
import App from './components/App';

// Install Raven in production
if (__PROD__ && process.env.SENTRY_DSN) {
  Raven.config(process.env.SENTRY_DSN, {
    release: process.env.SENTRY_BUILD ? process.env.SENTRY_BUILD : 'local',
    environment: process.env.SENTRY_ENV ? process.env.SENTRY_ENV : 'dev',
  }).install();
}

// Add service worker in production
if (__PROD__ && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Create root component and mount
const root = (
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
);

render(root, document.getElementById('react-root'));

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
