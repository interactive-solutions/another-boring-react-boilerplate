// @flow
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import DummyForm from './DummyForm';

const Second = () => (
  <Fragment>
    <Helmet>
      <title>Second</title>
    </Helmet>

    <p>This is the second page...</p>

    <p>This page includes a dummy form using redux-form.</p>

    <p>
      Since the Button component is required here as well, it is bundled with the main js bundle.
      See report.html for the bundle analyzer report.
    </p>

    <hr />

    <DummyForm />
  </Fragment>
);

export default Second;
