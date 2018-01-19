import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Button from '../../components/Button';

const submit = values =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};

      if (!values.firstName || values.firstName.toLowerCase() !== 'donald') {
        errors.firstName = 'First name must be Donald!';
      }

      if (!values.lastName || values.lastName.toLowerCase() !== 'trump') {
        errors.lastName = 'Last name must be Trump!';
      }

      if (Object.keys(errors).length > 0) {
        errors._error = 'Could not submit!';
        reject(new SubmissionError(errors));
      } else {
        alert('Send form!'); // eslint-disable-line
        resolve();
      }
    }, 300);
  });

const renderField = ({ input, label, meta: { touched, error } }) => (
  <label htmlFor={input.name}>
    {label}
    <input {...input} type="text" id={input.name} />
    {touched && error && <div style={{ marginBottom: '1em', color: '#f00' }}>{error}</div>}
  </label>
);

const DummyForm = props => {
  const { handleSubmit, error } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && (
        <div style={{ marginBottom: '2em', color: '#f00' }}>
          <strong>{error}</strong>
        </div>
      )}

      <Field name="firstName" id="firstName" component={renderField} label="First name" />

      <Field name="lastName" id="lastName" component={renderField} label="Last name" />

      <Button text="Submit" />
    </form>
  );
};

export default reduxForm({
  form: 'dummy',
})(DummyForm);
