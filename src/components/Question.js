import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
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

  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      this.props.startTimer(this.props.question.ms);
    }
    if (this.props.timer <= 0) {
      const { email, questionNumber, answer = 'no answer given' } = this.props;
      this.handleFormSubmit({ questionNumber, answer, email });
    }
  }

  handleFormSubmit() {
    const { email, questionNumber, answer = 'no answer given' } = this.props;
    if (this.props.isLastQuestion) {
      this.props.submitFinalQuestion({
        questionNumber,
        answer,
        email,
      });
    } else {
      this.props.submitQuestion({
        questionNumber,
        answer,
        email,
      });
    }
    // TODO figure out bug why validations don't apply to questions >= 1
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

  // TODO create Timer component
  // TODO show time in mm:ss
  render() {
    const { handleSubmit, submitting, isLastQuestion } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        Seconds remaining: {this.props.timer / 1000}

        <Field
          label={this.props.question.text}
          id="question"
          name="question"
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
  answer: PropTypes.string,
  email: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
  questionNumber: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  submitFinalQuestion: PropTypes.func.isRequired,
  submitQuestion: PropTypes.func.isRequired,
};

const form = 'question';
const selector = formValueSelector(form);

const mapStateToProps = state => ({
  email: state.email,
  errorMessage: state.errorMessage,
  answer: selector(state, 'question'),
  timer: state.timer,
});

const mapDispatchToProps = dispatch => ({
  startTimer: ms => dispatch(startTimer(ms)),
  submitFinalQuestion: ({ questionNumber, answer, email }) => {
    dispatch(submitFinalQuestion({ questionNumber, answer, email }));
  },
  submitQuestion: ({ questionNumber, answer, email }) => {
    dispatch(submitQuestion({ questionNumber, answer, email }));
  },
});

export default reduxForm({
  form,
})(connect(mapStateToProps, mapDispatchToProps)(Question));
