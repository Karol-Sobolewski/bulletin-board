import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll, selectPost, getAllPublished, fetchPublished, getAllWithDrafted } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PostBoard.module.scss';
import { Post } from '../../views/Post/Post';
import { Posts } from '../../views/Posts/Posts';
import { PostAdd } from '../../views/PostAdd/PostAdd';

class Component extends React.Component {
  state = {
    addPostButtonClasses: styles.activeButton,
    addPostBoardClasses: '',
  }
  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
    // fetchUsers();

  }
  selectedPost(payload){
    const { sendActivePost } = this.props;
    // console.log('user', payload);
    sendActivePost(payload);
  }
  handlePostButton = () => {
    const addPostBoard = document.getElementById('addPostBoard');
    // const addPostButton = document.getElementById('addPostbutton');
    this.setState({addPostBoardClasses: styles.active});
    this.setState({addPostButtonClasses:  styles.addPostButton});
    // addPostBoard.className += 'active';
    // this.addPostButton.current.classList.add('active');
    // addPostButton.classList.remove('active');
    // addPostButton.className -= 'active';
  }
  render(){
    const {className, children, postsList, isLogged, publishedPosts, addPostButton, posts, fetchPublishedPosts }= this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <div className={`${styles.postsGrid} justify-content-center`}>
          {posts.length ? posts.map(post => { //eslint-disable-line
            return <Link key={post._id} to={`/post/${post._id}`} onClick={(payload) => this.selectedPost(post)} className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-between pt-3 pb-3`}>
              <Posts {...post} />
            </Link>;
          }) : <p>There are no post. {isLogged.active ? <p>Add new one.</p>: null}</p>}
          {isLogged.active ?
            <div className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-center pt-3 pb-3`}>
              {/* className={styles.addPostButton} */}
              <Button className={this.state.addPostButtonClasses} name='Add' onClick={this.handlePostButton}> </Button>
              <PostAdd className={this.state.addPostBoardClasses} />
            </div> : null}
        </div>
      </div>
    );
  }
}
Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  postsList: PropTypes.any,
  isLogged: PropTypes.object,
  publishedPosts: PropTypes.any,
  sendActivePost: PropTypes.func,
  addPostButton: PropTypes.func,
  posts: PropTypes.any,
  fetchPublishedPosts : PropTypes.any,
};

const mapStateToProps = state => ({
  postsList: getAll(state),
  publishedPosts: getAllPublished(state),
  isLogged: getActive(state),
  posts: getAllWithDrafted(state),

});

const mapDispatchToProps = dispatch => ({
  sendActivePost: payload => dispatch(selectPost(payload)),
  fetchPublishedPosts: () => dispatch(fetchPublished()),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostBoard,
  Container as PostBoard,
  Component as PostBoardComponent,
};
