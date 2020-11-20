import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
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
    const {className, children} = this.props;
    return(
      <div className={clsx(className, styles.root)}>
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
  postEdit: PropTypes.func,
};

const mapStateToProps = state => ({
  postsList: getAll(state),
  activeUser: getActive(state),
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
