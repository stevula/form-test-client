import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Question from './Question';

class Test extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  render() {
    if (this.props.questions.length === 0) {
      // TODO render loading view
      return null;
    }

    const currentQuestion = this.props.questions[this.props.questionNumber];
    const isLastQuestion = (
      this.props.questionNumber === this.props.questions.length - 1
    );

    return (
      <div>
        <Question
          question={currentQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    );
  }
}

Test.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  questionNumber: state.questionNumber,
  questions: state.questions,
});

export default connect(mapStateToProps, { fetchQuestions })(Test);
