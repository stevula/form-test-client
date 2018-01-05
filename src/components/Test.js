import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';

class Test extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        {this.props.questions}
      </div>
    );
  }
}

Test.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questions,
});

export default connect(mapStateToProps, { fetchQuestions })(Test);
