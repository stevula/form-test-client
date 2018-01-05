import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { signupUser } from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit({ email, password }, dispatch) {
    dispatch(signupUser({ email, password }));
  }

  isValidEmail(email) {
    return (
      email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ?
        'Invalid email address'
        :
        undefined
    );
  }

  isRequired(val) {
    return val ? undefined : 'Field is required.';
  }

  renderField({ input, type, label, id, meta: { touched, error } }) {
    return (
      <fieldset className="form-group">
        <label htmlFor={id}>
          {label}:
          <input {...input} id={id} type={type} className="form-control" />

          {this.renderValidationError({ touched, error })}
        </label>
      </fieldset>
    );
  }

  renderValidationError({ error, touched }) {
    if (!touched || !error) return null;

    return (
      <div className="alert alert-danger">
        <strong>{error}</strong>
      </div>
    );
  }

  renderAlert() {
    if (!this.props.errorMessage) return null;

    return (
      <div className="alert alert-danger">
        <strong>Oops! {this.props.errorMessage}</strong>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting, isSignedIn } = this.props;

    if (isSignedIn) {
      return (
        <Redirect to={{
          pathname: '/feature',
          state: { from: this.props.location },
        }} />
      );
    }

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          label="Email"
          id="email"
          name="email"
          className="form-control"
          component={this.renderField}
          validate={[this.isValidEmail, this.isRequired]}
          type="text"
          required
        />

        <Field
          label="Password"
          id="password"
          name="password"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          type="password"
          required
        />

        <Field
          label="Confirm password"
          id="password-confirm"
          name="passwordConfirm"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          type="password"
          required
        />

        {this.renderAlert()}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          Sign up
        </button>
      </form>
    );
  }
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const validate = (values) => {
  const errors = {};
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match.';
  }
  return errors;
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  isSignedIn: state.isSignedIn,
});

export default reduxForm({
  form: 'signup',
  validate,
})(connect(mapStateToProps)(Signup));
