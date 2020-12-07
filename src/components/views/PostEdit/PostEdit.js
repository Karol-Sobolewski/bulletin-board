import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getActivePost } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import styles from './PostEdit.module.scss';
import {NotFound} from '../../views/NotFound/NotFound';
import {PostForm} from '../../common/PostForm/PostForm';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    const {className, activePost} = this.props;
    const redirectToPost = this.state.redirectToPost;

    return(
      redirectToPost ? <Redirect to={`/post/${activePost._id}`} /> :
        <div className={clsx(className, styles.root)}>
          {activePost.author ? <PostForm postId={this.props.match.params.id} type={'Edit'} />
            : <NotFound />}
        </div>

    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUser: PropTypes.object,
  activePost: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  activePost: getActivePost(state),
  loggedUser: getActive(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   updatePost: (payload) => dispatch(editPostRequest(payload)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
