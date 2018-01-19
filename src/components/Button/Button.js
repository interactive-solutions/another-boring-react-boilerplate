// @flow
import React from 'react';

import './Button.scss';

type Props = {
  text?: string,
  alertText?: string,
  onClick?: ?() => mixed,
};

const Button = (props: Props) => (
  <button
    styleName="button"
    onClick={() => {
      if (props.onClick) {
        props.onClick();
      } else if (props.alertText) {
        alert(props.alertText); // eslint-disable-line
      }
    }}
  >
    {props.text}
  </button>
);

Button.defaultProps = {
  text: 'Button',
  alertText: '',
  onClick: null,
};

export default Button;
