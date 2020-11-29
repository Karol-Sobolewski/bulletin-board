import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getActivePost, getPostById , fetchSelected } from '../../../redux/postsRedux';
import {  getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import styles from './Post.module.scss';
import { PostEdit } from '../PostEdit/PostEdit';
import { Link} from 'react-router-dom';
import {NotFound} from '../NotFound/NotFound';

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
    const { fetchSelectedPost } = this.props;
    // console.log(`selected post id`, this.props.match.params.id); //eslint-disable-line
    fetchSelectedPost(this.props.match.params.id); //eslint-disable-line
  }
  render(){
    const {className, children, activePost, activeUser, post} = this.props;
    // console.log(`fetchSelected`, fetchSelected);
    return(
      // post.error === true ? <NotFound /> :
      <div className={clsx(className, styles.root)}>
        {/* {console.log(post)} */}
        <h3 className={`${styles.postTitle} align-self-start`}>{post.title}</h3> {/* eslint-disable-line */}
        {post.description}
        <p className={`align-self-end`}>By: {post.author}</p>
        <p>Posted: {post.created}</p>
        {/* {console.log(`edited`, post)} */}
        {post.editDate ? <p>Last Edited: {post.editDate} by: {post.editAuthor}</p> : null}
        {post.status}
        {activeUser.name === post.author || activeUser.name === 'Admin' ?
          <Link key={post._id} to={`/post/${post._id}/edit`}>
              Edit
          </Link> :
          null}
        {children}
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
  author: PropTypes.node,
  post: PropTypes.any,
  fetchSelected: PropTypes.func,
  fetchSelectedPost: PropTypes.any,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  postsList: getAll(state),
  activeUser: getActive(state),
  activePost: getActivePost(state),


  // activePost: getActivePost(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSelectedPost: (id) => dispatch(fetchSelected(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
