import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll, selectPost } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import { Post } from '../../views/Post/Post';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PostBoard.module.scss';
import { PostAdd } from '../../views/PostAdd/PostAdd';

class Component extends React.Component {
  selectedPost(payload){
    const { sendActivePost } = this.props;
    // console.log('user', payload);
    sendActivePost(payload);
  }

  render(){
    const {className, children, postsList, isLogged}= this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <h2 className="row">PostBoard</h2>
        <div className={`${styles.postsGrid} justify-content-center`}>
          {postsList.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} onClick={(payload) => this.selectedPost(post)} className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-between pt-3 pb-3`}>
              <Post key={post.id}>
                <h3 className={`${styles.postTitle} align-self-start`}>{post.title}</h3>
                <p>{post.description}</p>
                <p className={`align-self-end`}>By: {post.user}</p>
                {isLogged.name === post.user || isLogged.name === 'Admin' ? <button onClick={console.log('edit')}>Edit</button> : null}

              </Post>
            </Link>
          ))}
          {isLogged.active ?
            <div className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-center pt-3 pb-3`}>
              {/* className={styles.addPostButton} */}
              <div className={styles.addPostButton}>
                {/* <Button name='Add new post' className ="test" onClick={console.log('add')}/> */}

              </div>
              <PostAdd />
            </div> : null}
        </div>
        {children}
      </div>
    );
  }
}
Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  postsList: PropTypes.any,
  isLogged: PropTypes.object,
  sendActivePost: PropTypes.func,
};

const mapStateToProps = state => ({
  postsList: getAll(state),
  isLogged: getActive(state),
});

const mapDispatchToProps = dispatch => ({
  sendActivePost: payload => dispatch(selectPost(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostBoard,
  Container as PostBoard,
  Component as PostBoardComponent,
};
