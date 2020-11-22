import React from 'react';
import PropTypes from 'prop-types';
import {Post} from '../Post/Post';
import clsx from 'clsx';
import { connect } from 'react-redux';

import {PostEdit} from '../PostEdit/PostEdit';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import {  getActive } from '../../../redux/usersRedux';

import styles from './Posts.module.scss';

const Component = ({activeUser, className, children, id, title, description, author, date, edited, status}) => {
  console.log('user name', activeUser.name);
  console.log('author', author);
  console.log('status', status);
  console.log((status === 'draft' && activeUser.name === author) || (status === 'draft' && activeUser.name === `Admin`) ? 'yes': 'no');
  //TODO When post is draft and when user is not the author than is not visible.
  return(
    <div className={clsx(className, styles.root)}>
      <h3 className={`${styles.postTitle} align-self-start`}>{title}</h3>
      <p className={`${styles.postDescription}`}>{description}</p>
      <p className={`align-self-end`}>by: {author}</p>
      <p>Posted: {date}</p>
      {edited ? <p>Last Edited: {edited.date} by: {edited.name}</p> : null}
      {props => <Post {...props} key={this.props.id} />}
      {children}
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  author: PropTypes.node,
  date: PropTypes.node,
  edited: PropTypes.object,
  status: PropTypes.node,
  activeUser: PropTypes.object,
};

const mapStateToProps = (state, props) => ({

  activeUser: getActive(state),

});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Posts,
  Container as Posts,
  Component as PostsComponent,
};
