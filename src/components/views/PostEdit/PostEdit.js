import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPost, getAll, getActivePost, getPostById, updatePost, editPostRequest } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import styles from './PostEdit.module.scss';
import {NotFound} from '../../views/NotFound/NotFound';
class Component extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const hours = () => {
      let hour = date.getUTCHours()+1;
      if (hour === 0) hour = '00';
      if (hour > 0 && hour < 10 ) hour = `0${hour}`;
      return hour;
    };
    const minutes = () => {
      let minute = date.getUTCMinutes();
      if (minute === 0) minute = '00';
      if (minute > 0 && minute < 10 ) minute = `0${minute}`;
      return minute;
    };
    const dateString = `${date.getUTCDate()}-${(date.getUTCMonth()+1)}-${date.getUTCFullYear()} at ${hours()}:${minutes()}`;

    this.state = {
      id: this.props.activePost._id,
      title: this.props.activePost.title,
      description: this.props.activePost.description,
      author: this.props.activePost.author,
      created: this.props.activePost.created,
      status: this.props.activePost.state,
      edited: {
        name: this.props.loggedUser.name,
        date: dateString,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { updatePost, loggedUser, activePost} = this.props;
    if (this.props.activePost.author === loggedUser.name || loggedUser.name === 'Admin'){
      if (!this.state.title || !this.state.description) {
        alert('Please fill all fields' );
        e.preventDefault();
      } else if (this.state.title.length > 20) {
        alert('Title is too long' );
        e.preventDefault();
      }
      else{
        e.preventDefault();
        updatePost(this.state);
        // TODO when status of post is not selected again-> status is undefined
      }
    } else {
      alert('You have no premisions to edit this post');
    }
    return false;
  }
  handleChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  render(){
    const {className, children, activePost, loggedUser} = this.props;
    // console.log(`editpage`, activePost.status);
    return(

      <div className={clsx(className, styles.root)}>
        {activePost.author ? <div> <form name="editPost" onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className={`${styles.postAdd} d-flex flex-column align-items-center justify-content-between`}>
            <input defaultValue={this.state.title} className={`${styles.postAddTitle} align-self-start`} type="text" name='title' placeholder="Title"/>
            <textarea defaultValue={this.state.description} rows="6" name='description' placeholder="Description"/>
            <p className={`align-self-end`}>By: {this.state.author}</p>
            <input type="submit" value="Send" />
          </div>
          <select name="status" value={activePost.status}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </form> </div> : <NotFound />}
      </div>

    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  activePost: PropTypes.object,
  updatePost: PropTypes.func,
  loggedUser: PropTypes.object,
  clearData: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  activePost: getActivePost(state),
  loggedUser: getActive(state),

});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (payload) => dispatch(editPostRequest(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
