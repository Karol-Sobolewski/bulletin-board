import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getActivePost } from '../../../redux/postsRedux';
import {  getActive } from '../../../redux/usersRedux';

import styles from './Post.module.scss';

class Component extends React.Component {
  postEdit() {
    // const {postsList, activeUser } = this.pops;
    // const editable = postsList.filter(post => post.user===activeUser.name);
    // if (editable.user = activeUser.name) {
    //   console.log('yes');
    // }
    // console.log('no');
  }
  render(){
    const {className, children, activePost, activeUser} = this.props;
    return(
      <div className={clsx(className, styles.root)}>
        {/* {activePost.id} */}
        <h3 className={`${styles.postTitle} align-self-start`}>{activePost.title}</h3>
        <p>{activePost.description}</p>
        <p className={`align-self-end`}>{activePost.user}</p>
        {activeUser.name === activePost.user || activeUser.name === 'Admin' ? <button onClick={console.log('edit')}>Edit</button> : null}

        {children}
        {/* {console.log(postsList, activeUser, postEdit)} */}
        {/* {console.log('pu', postsList.filter(post => post.user===activeUser.name)} */}

        {/* {console.log('user', postsList.filter(post => post.user===activeUser.name), )} */}
        {/* {activeUser.user = activeUser.name ? console.log(postsList.user) : console.log('no')} */}
        {/* {console.log(activeUser.name)} */}
        {/* <button onClick={console.log('postlist', postsList)}>Edit</button> */}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postsList: PropTypes.any,
  activeUser: PropTypes.node,
  activePost: PropTypes.object,
  postEdit: PropTypes.func,
};

const mapStateToProps = state => ({
  postsList: getAll(state),
  activeUser: getActive(state),
  activePost: getActivePost(state),
  // activePost: getActivePost(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
