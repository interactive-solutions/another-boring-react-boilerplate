import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from '../../redux/store';

describe('App', () => {
  // This is probably not the best way to test this component
  const app = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  it('should have one footer', () => {
    expect(app.find('.footer')).toHaveLength(1);
  });
});
