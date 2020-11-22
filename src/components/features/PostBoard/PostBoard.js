import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll, selectPost } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PostBoard.module.scss';
import { Post } from '../../views/Post/Post';
import { Posts } from '../../views/Posts/Posts';
import { PostAdd } from '../../views/PostAdd/PostAdd';

class Component extends React.Component {
  selectedPost(payload){
    const { sendActivePost } = this.props;
    // console.log('user', payload);
    sendActivePost(payload);
  }
  addPostButton(add){
    console.log('add');
  }
  render(){
    const {className, children, postsList, isLogged, addPostButton}= this.props;
    const postFiltered = postsList.filter(post => post.status === 'draft');
    // console.log(`isLogged`, isLogged);
    const postMapped = postFiltered.map(post => post.author === isLogged.name);
    console.log(postFiltered);
    console.log(postMapped);
    return (
      <div className={clsx(className, styles.root)}>
        <div className={`${styles.postsGrid} justify-content-center`}>
          {postsList.length ? postsList.map(post => {
            // console.log('1', post.status != 'draft' && isLogged.active ? post.status : null);
            // console.log('2', post.status === 'draft' && (isLogged.user !=  post.user ||  isLogged.user ==  'Admin')? post.status : null);
            return <Link key={post.id} to={`/post/${post.id}`} onClick={(payload) => this.selectedPost(post)} className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-between pt-3 pb-3`}>
              <Posts {...post} />
            </Link>;
          }) : <p>There are no post. {isLogged.active ? <p>Add new one.</p>: null}</p>}
          {isLogged.active ?
            <div className={`${styles.post} col-sm-12 col-md-6 col-lg-3 d-flex flex-column align-items-center justify-content-center pt-3 pb-3`}>
              {/* className={styles.addPostButton} */}
              <button className={styles.addPostButton} onClick={addPostButton}>
                Add
              </button>
              <PostAdd />
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
  sendActivePost: PropTypes.func,
  addPostButton: PropTypes.func,
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
