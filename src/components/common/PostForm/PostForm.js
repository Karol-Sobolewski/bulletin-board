import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Button from '../Button/Button';

import { connect } from 'react-redux';
import { getActive } from '../../../redux/usersRedux';
import { getActivePost, addPostRequest, editPostRequest } from '../../../redux/postsRedux';
import styles from './PostForm.module.scss';


class Component extends React.Component {
  constructor(props) {
    super(props);
    const { type } = this.props;
    console.log(`type constructor`, type);
    if (type === `Add`) {
      this.state = {title: '', created: new Date(), status: 'draft'};
    } else {
      this.state = {
        id: this.props.activePost._id,
        title: this.props.activePost.title,
        description: this.props.activePost.description,
        author: this.props.activePost.author,
        created: this.props.activePost.created,
        status: this.props.activePost.state,
        editDate: new Date(),
        editAuthor: this.props.loggedUser.name,
      };
    }
  }

  handleSubmit(e) {
    const { addNewPost, updatePost, loggedUser, type  } = this.props;
    if (!this.state.title || !this.state.description || ( type === `Add` ? !this.state.email : null)) {
      alert('Please fill all fields' );
      e.preventDefault();
    } else if (this.state.title.length < 10) {
      alert('Title is too short. Minimum 10 characters.' );
      e.preventDefault();
    } else if (this.state.title.length > 20) {
      alert('Title is too long. Maximum 20 characters.' );
      e.preventDefault();
    }else if (this.state.description.length < 20) {
      alert('Description is too short. Minimum 20 characters.' );
      e.preventDefault();
    } else if (this.state.description.length > 1000) {
      alert('Description is too long. Maximum 1000 characters.' );
      e.preventDefault();
    } else{
      if (type === `Add`) {
        this.setState({user: loggedUser.name});
        this.setState({created: new Date()});
        if (this.state.status === 'draft') {
          addNewPost(this.state);
          alert('Your post has benn added, but you have to publish it. Edit it right now' );
          document.getElementsByName('addPost')[0].reset();
          this.clearData();
          e.preventDefault();
        } else {
          document.getElementsByName('addPost')[0].reset();
          this.clearData();
          addNewPost(this.state);
          e.preventDefault();
        }
      } else if (type === `Edit`) {
        console.log(`edit`);
        e.preventDefault();
        updatePost(this.state);
        // TODO when status of post is not selected again-> status is undefined
        this.setState({redirectToPost: true});
      }
    }
  }

  clearData() {
    this.setState({
      title: '',
      description: '',
      email: '',
      user: '',
      status: 'draft',
    });
  }

  handleEditPost(e) {
    e.preventDefault();
    console.log(`edit`);
  }

  handleChange(e){
    const { loggedUser, type, activePost } = this.props;
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
    if(!this.state.status){
      this.setState({status: activePost.status});
    }
    if(type === `Add`) {
      this.setState({user: loggedUser.name});
    }
    console.log(this.state);
    // console.log(activePost);
  }

  render(){
    const {className, children, type, loggedUser, activePost} = this.props;
    console.log(`type`, type);
    return (
      <div className={clsx(className, styles.root)}>
        <form name="addPost" onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)}>
          <div className={`${styles.postAdd} d-flex flex-column align-items-center justify-content-between`}>
            <input className={`${styles.postAddTitle} align-self-start`} defaultValue={this.state.title} type="text" name='title' placeholder="Title"/>
            <textarea rows="6" name='description' placeholder="Description" defaultValue={this.state.description}/>
            <div className={`row d-flex align-items-center justify-content-between`}>
              {type === `Add` ? <input className={`${styles.postAddMail} col-6`} type="email" name='email' placeholder="email" /> : null}
              <p>By: {type === `Add` ? loggedUser.name : this.state.author}</p>
            </div>
            <input className={`${styles.buttonAdd} col-6`} type="submit" value="Send" component={Button}/>
          </div>
          <select name="status">
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
            {type === `Edit` ? (<option value="closed">Closed</option>): null}
          </select>
        </form>
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  loggedUser: PropTypes.object,
  addNewPost: PropTypes.func,
  activePost: PropTypes.object,
  className: PropTypes.string,
  updatePost: PropTypes.func,
  type: PropTypes.string,
};

const mapStateToProps = state => ({
  loggedUser: getActive(state),
  activePost: getActivePost(state),
}
);

const mapDispatchToProps = dispatch => ({
  addNewPost: (payload) => dispatch(addPostRequest(payload)),
  updatePost: (payload) => dispatch(editPostRequest(payload)),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostForm,
  Container as PostForm,
  Component as PostFormComponent,
};
