import React, { Component } from "react";

export default function(ComposedComponent) {
  class Authenticate extends Component {
    checkAndRedirect() {
      const { isAuthenticated, redirect } = this.props;

      if (!isAuthenticated) {
        redirect();
      }
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated ? (
            <ComposedComponent {...this.props} />
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.authentication.isAuthenticated
    };
  };

  const mapDispatchToProps = {
    redirect: redirectToLogin
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
