// @flow
import React, { Fragment } from 'react';
import Button from '../components/Button';

const Second = () => (
  <Fragment>
    <p>This is the second page...</p>
    <p>
      Since the Button component is required here as well, it is bundled with the main js bundle.
      See report.html for the bundle analyzer report.
    </p>

    <Button alertText="I was clicked on the second page!" />
  </Fragment>
);

export default Second;
