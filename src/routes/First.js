// @flow
import React, { Fragment } from 'react';
import Button from '../components/Button';
import image from '../assets/images/example.png';

const First = () => (
  <Fragment>
    <p>This is a starter kit I made because I don&apos;t really like starter kits... 🙄</p>

    <p>
      Anyway, I realized most of my projects end up with a very similar set up, and I got tired of
      spending a few hours doing that each time I started something new. Architecture in a React app
      is most of the time a matter of personal preference, and this boilerplate includes the
      features that I prefer.
    </p>

    <p>
      If you are looking for a more general, well-written starter kit, you probably should have a
      look at <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>.
    </p>

    <img src={image} alt="Test" style={{ width: '100px' }} />

    <hr />

    <h3>A couple of included features</h3>

    <ul>
      <li>Decent webpack configs for dev and prod.</li>
      <li>Redux and RxJs (redux-loadable).</li>
      <li>CSS modules with SASS, autoprefixer, and global support.</li>
      <li>React-router for navigation.</li>
      <li>Code splitting: vendor, manifest and route based with react-loadable.</li>
      <li>Service Worker to cache build files.</li>
      <li>Babel & ESLint with Airbnb config.</li>
      <li>Flow type checking.</li>
      <li>Testing with Jest and Enzyme.</li>
      <li>Webpack-dev-server for developing and serve to test builds.</li>
      <li>Bundle analyzer.</li>
    </ul>

    <h3>What is not included</h3>

    <ul>
      <li>HMR - not a fan.</li>
    </ul>

    <h3>Example component</h3>

    <p>
      This button component is type checked with flow, is using CSS modules, has global SASS
      variables and is tested with Jest and Enzyme.
    </p>

    <Button alertText="I was clicked on the first page!" />
  </Fragment>
);

export default First;
