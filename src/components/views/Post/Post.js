import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getActivePost, getPostById } from '../../../redux/postsRedux';
import {  getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
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
  componentDidMount() {
    // console.log('props', this.props.match.params.id);
  }
  render(){
    const {className, children, activePost, activeUser, id, title, description, post, user} = this.props;
    return(
      <div className={clsx(className, styles.root)}>
        <h3 className={`${styles.postTitle} align-self-start`}>{post.title}</h3>
        <p className={`align-self-end`}>By: {post.user}</p>
        {post.description}
        {activeUser.name === post.user || activeUser.name === 'Admin' ? <Button onClick={console.log('edit')} name={'Edit'}>Edit</Button> : null}
        {/* {console.log(id)} */}
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
  activeUser: PropTypes.object,
  activePost: PropTypes.object,
  postEdit: PropTypes.func,
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  user: PropTypes.node,
  post: PropTypes.any,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
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
