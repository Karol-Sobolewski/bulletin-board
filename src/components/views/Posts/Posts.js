import React from 'react';
import PropTypes from 'prop-types';
import {Post} from '../Post/Post';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Posts.module.scss';

const Component = ({className, children, id, title, description, user }) => (
  <div className={clsx(className, styles.root)}>
    <h3 className={`${styles.postTitle} align-self-start`}>{title}</h3>
    <p>{description}</p>
    <p className={`align-self-end`}>{user}</p>
    {/* <Post /> */}
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  user: PropTypes.node,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Posts,
  // Container as PostAll,
  Component as PostsComponent,
};
