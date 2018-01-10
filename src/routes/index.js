// @flow
import L from 'react-loadable';

// Set default config for react-loadable
const Loadable = opts =>
  L({
    loading: () => null,
    ...opts,
  });

// Define async routes
const AsyncFirst = Loadable({
  loader: () => import(/* webpackChunkName: 'first' */ './First'),
});

const AsyncSecond = Loadable({
  loader: () => import(/* webpackChunkName: 'second' */ './Second'),
});

const AsyncThird = Loadable({
  loader: () => import(/* webpackChunkName: 'third' */ './Third'),
});

export default { AsyncFirst, AsyncSecond, AsyncThird };
