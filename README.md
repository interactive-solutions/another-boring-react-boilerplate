# Another Boring React Boilerplate

This is a starter kit I made because I don't really like starter kits... 🙄

Anyway, I realized most of my projects end up with a very similar set up, and I got tired of spending a few hours doing that each time I started something new. Architecture in a React app is most of the time a matter of personal preference, and this boilerplate includes the features that I prefer.

## A couple of included features

* Decent webpack configs for dev and prod.
* Redux and RxJs (redux-loadable).
* CSS modules with SASS, autoprefixer, and global support.
* React-router for navigation.
* Code splitting: vendor, manifest and route based with react-loadable.
* Service Worker to cache build files.
* Babel & ESLint with Airbnb config.
* Flow type checking.
* Testing with Jest and Enzyme.
* Webpack-dev-server for developing and serve to test builds.
* Bundle analyzer.

## What is not included

* HMR - not a fan.

## Installation

1. Clone repository
2. `yarn install`

## Available commands

* `yarn start` - starts webpack dev server
* `yarn build` - builds project to /dist
* `yarn serve` - serves the /dist directory in order to test build locally
* `yarn test` - runs test with Jest
* `yarn flow` - starts flow server
