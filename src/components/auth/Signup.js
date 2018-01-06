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

  handleFormSubmit({ email, firstName, lastName }, dispatch) {
    dispatch(signupUser({ email, firstName, lastName }));
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
    const { handleSubmit, submitting, isSignedIn, email } = this.props;

    if (isSignedIn && email) {
      return (
        <Redirect to={{
          pathname: '/test',
          state: { from: this.props.location },
        }} />
      );
    }

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          label="First name"
          id="first-name"
          name="firstName"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          type="text"
          required
        />

        <Field
          label="Last name"
          id="last-name"
          name="lastName"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          type="text"
          required
        />

        <Field
          label="E-mail address"
          id="email"
          name="email"
          className="form-check-input"
          component={this.renderField}
          validate={[this.isValidEmail, this.isRequired]}
          type="email"
          required
        />

        <Field
          label="I accept and agree to the Terms of Use and Privacy Statement"
          id="tos"
          name="tos"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          type="checkbox"
          required
        />

        {this.renderAlert()}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    );
  }
}

Signup.propTypes = {
  email: PropTypes.string,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  email: state.email,
  errorMessage: state.errorMessage,
  isSignedIn: state.isSignedIn,
});

export default reduxForm({
  form: 'signup',
})(connect(mapStateToProps)(Signup));
