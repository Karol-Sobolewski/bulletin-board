import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getActivePost, getPostById , fetchSelected } from '../../../redux/postsRedux';
import {  getActive } from '../../../redux/usersRedux';
//import Button from '../../common/Button/Button';
import styles from './Post.module.scss';
//import { PostEdit } from '../PostEdit/PostEdit';
import { Link} from 'react-router-dom';
//import {NotFound} from '../NotFound/NotFound';

class Component extends React.Component {

  componentDidMount() {
    const { fetchSelectedPost } = this.props;
    fetchSelectedPost(this.props.match.params.id); //eslint-disable-line

    //TODO component update after submit via EditPost and add post,

  }
  render(){
    const {className, children, activeUser, post} = this.props;
    return(
      <div className={clsx(className, styles.root)}>
        <h3 className={`${styles.postTitle} align-self-start`}>{post.title}</h3>
        {post.description}
        <p className={`align-self-end`}>By: {post.author}</p>
        <p>Posted: {post.created}</p>
        {post.editDate ? <p>Last Edited: {post.editDate.split('T')[0]} by: {post.editAuthor}</p> : null}
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
