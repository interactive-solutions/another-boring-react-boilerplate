# Another Boring React Boilerplate

This is a starter kit I made because I don't really like starter kits... 🙄

Anyway, I realized most of my projects end up with a very similar set up, and I got tired of
spending a few hours doing that each time I started something new. Architecture in a React app is
most of the time a matter of personal preference, and this boilerplate includes the features that I
prefer.

## A couple of included features

* Decent webpack configs for dev and prod.
* Redux, Reselect and RxJs (redux-loadable).
* React-router-redux with Helmet for navigation.
* CSS modules with SASS, autoprefixer, and global support.
* Sentry support with redux state and sourcemaps in production builds.
* Code splitting with react-loadable.
* Service Worker to cache build files.
* Babel & ESLint with Airbnb config.
* Flow type checking.
* Testing with Jest and Enzyme.
* Webpack-dev-server for developing and serve to test builds.
* Hot Module Reloading.
* Bundle analyzer.

## Installation

1. Clone repository
2. `yarn install`

## Available commands

* `yarn start` - starts webpack dev server (use --hot for HMR)
* `yarn build` - builds project to /dist
* `yarn serve` - serves the /dist directory in order to test build locally
* `yarn test` - runs test with Jest
* `yarn flow` - starts flow server

## Sentry configuration

In order to build for Sentry, the following environment variables (also listed in .env.example)
needs to be available:

* `SENTRY_AUTH_TOKEN` - an auth token created for your account on the Sentry dashboard
* `SENTRY_URL` - base url to the Sentry Installation
* `SENTRY_ORG` - organization slug
* `SENTRY_PROJECT` - project slug
* `SENTRY_DSN` - public project DSN

You can also use `SENTRY_ENV` and `SENTRY_BUILD` to set build release number and environment. Those
will default to dev/local.
