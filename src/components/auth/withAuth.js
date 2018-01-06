import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default (WrappedComponent) => {
  class withAuth extends Component {
    render() {
      if (!this.props.isSignedIn || !this.props.email) {
        return <Redirect to="/" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  withAuth.propTypes = {
    email: PropTypes.string.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    email: state.email,
    isSignedIn: state.isSignedIn,
  });

  return connect(mapStateToProps)(withAuth);
};
