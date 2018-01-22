import React from 'react';
import Button from './Button';

describe('Button', () => {
  const button = shallow(<Button text="I am a button" />);

  it('should render correctly', () => {
    expect(button).toMatchSnapshot();
  });

  it('should have class .button', () => {
    expect(button.hasClass('button')).toBeTruthy();
  });

  it('should display passed text prop', () => {
    expect(button.text()).toBe('I am a button');
  });

  it('should not alert anything if alertText prop is not provided', () => {
    window.alert = jest.fn();
    button.simulate('click');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should display custom alert text if alertText prop is provided', () => {
    button.setProps({ alertText: 'Hi!' });
    button.simulate('click');
    expect(window.alert).toHaveBeenCalledWith('Hi!');
  });
});
