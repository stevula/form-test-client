import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { submitQuestion, submitFinalQuestion, startTimer } from '../actions';

class Question extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  componentDidMount() {
    this.props.startTimer(this.props.question.ms);
  }

  handleFormSubmit({ questionNumber, answer }, dispatch) {
    if (this.props.isLastQuestion) {
      dispatch(submitFinalQuestion);
    } else {
      dispatch(submitQuestion({ questionNumber, answer }));
    }
    // TODO figure out bug where validations don't apply to questions >= 1
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

  renderField({ input, label, id, meta: { touched, error } }) {
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          <textarea {...input} id={id} className="form-control" />

          {this.renderValidationError({ touched, error })}
        </label>
      </div>
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
    const { handleSubmit, submitting, isLastQuestion } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        Time remaining: {this.props.timer / 1000}

        <Field
          label={this.props.question.text}
          id="first-name"
          name="firstName"
          className="form-control"
          component={this.renderField}
          validate={this.isRequired}
          required
        />

        {this.renderAlert()}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </form>
    );
  }
}

Question.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  timer: state.timer,
});

export default reduxForm({
  form: 'question',
})(connect(mapStateToProps, { startTimer })(Question));
