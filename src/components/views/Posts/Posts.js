import React from 'react';
import PropTypes from 'prop-types';
import {Post} from '../Post/Post';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {  getActive } from '../../../redux/usersRedux';

import styles from './Posts.module.scss';

const Component = ({
  className,
  children,
  title,
  description,
  author,
  created,
  editAuthor,
  editDate,
}) => {
  return(
    <div className={clsx(className, styles.root)}>
      <h3 className={`${styles.postTitle} align-self-start`}>{title}</h3>
      <p className={`${styles.postDescription}`}>{description}</p>
      <p className={`align-self-end`}>by: {author}</p>
      <p>Posted: {created.split('T')[0]}</p>
      {editDate ? <p>Last Edited: {editDate.split('T')[0]} by: {editAuthor}</p> : null}
      {props => <Post {...props} key={this.props._id} />}
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
  created: PropTypes.node,
  editDate: PropTypes.node,
  editAuthor: PropTypes.string,
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
