import React from 'react';
import App from './App';

describe('Button', () => {
  const app = mount(<App />);
  it('should have one footer', () => {
    expect(app.find('.footer')).toHaveLength(1);
  });
});
