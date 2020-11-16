import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll } from '../../../redux/postsRedux';
import clsx from 'clsx';

import styles from './PostBoard.module.scss';

const Component = ({className, children, postsList}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <h2 className="row">PostBoard</h2>
      <div className={`${styles.postsGrid} justify-content-center`}>
        {postsList.map(post => (
          <div key={post.id} className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-between pt-3 pb-3`}>
            <h3 className={`${styles.postTitle} align-self-start`}>{post.title}</h3>
            <p>{post.description}</p>
            <p className={`align-self-end`}>By: {post.user}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  postsList: PropTypes.any,
};

const mapStateToProps = state => ({
  postsList: getAll(state),

});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as PostBoard,
  Container as PostBoard,
  Component as PostBoardComponent,
};
