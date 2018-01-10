// @flow
import React from 'react';

import './Button.scss';

type Props = {
  text?: string,
  alertText?: string,
};

const Button = (props: Props) => (
  <button
    styleName="button"
    onClick={() => {
      alert(props.alertText); // eslint-disable-line
    }}
  >
    {props.text}
  </button>
);

Button.defaultProps = {
  text: 'Button',
  alertText: 'I was clicked!',
};

export default Button;
