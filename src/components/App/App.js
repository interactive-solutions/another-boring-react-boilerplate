// @flow
import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Helmet } from 'react-helmet';
import Raven from 'raven-js';
import history from '../../utils/history';
import Routes from '../../routes';

class App extends Component<{}> {
  componentDidCatch(error: Error, errorInfo: string) {
    // Catch error and send to Sentry in production
    if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="container">
          <Helmet
            defaultTitle="Another Boring React Boilerplate"
            titleTemplate="%s | Another Boring React Boilerplate"
          />

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
            &copy; 2018 Donald Trump |{' '}
            <a href="https://github.com/interactive-solutions/another-boring-react-boilerplate">
              GitHub
            </a>
          </p>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
