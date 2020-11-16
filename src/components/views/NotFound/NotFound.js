import React from 'react';
import PropTypes from 'prop-types';


import {Redirect} from 'react-router';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';

class Component extends React.Component {
  state = {
    redirect: false,
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }
  render () {
    const {className, children} = this.props;
    return (
      <div className={clsx(className, styles.root)}>

        {this.state.redirect
          ? <Redirect to="/" />
          :  <div>
            <h2>Sorry, Page Not Found</h2>
            <h3>You will be redirected automaticly in 5 seconds</h3>
            <a href="/">Go to Home Page</a>
          </div>
        }
        {children}
      </div>
    );
  }

}





Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
