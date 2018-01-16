// @flow
import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from '../../utils/history';
import Routes from '../../routes';

const App = () => (
  <ConnectedRouter history={history}>
    <div className="container">
      <h1>Another Boring React Boilerplate</h1>

      <ul className="nav">
        <li>
          <NavLink exact to="/">
            Intro
          </NavLink>
        </li>
        <li>
          <NavLink to="/second">Second</NavLink>
        </li>
        <li>
          <NavLink to="/third">Third</NavLink>
        </li>
      </ul>

      <Route exact path="/" component={Routes.AsyncFirst} />
      <Route path="/second" component={Routes.AsyncSecond} />
      <Route path="/third" component={Routes.AsyncThird} />

      <hr />

      <p className="footer">
        &copy; 2018 Donald Trump | <a href="https://github.com/jarnell">github.com/jarnell</a>
      </p>
    </div>
  </ConnectedRouter>
);

export default App;
