import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import styles from './PostAdd.module.scss';
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', created: new Date(), status: 'draft'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { addNewPost, loggedUser  } = this.props;
    this.setState({user: loggedUser.name});

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.title || !this.state.description || !this.state.email) {
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
    } else if (this.state.email.length < 3) {
      alert('Please fill you e-mail' );
      e.preventDefault();
    } else if (!this.state.email.match(mailformat)){
      alert('Please fill you e-mail correctly' );
    }else if (this.state.status === 'draft') {
      addNewPost(this.state);
      alert('Your post has benn added, but you have to publish it. Edit it right now' );
      document.getElementsByName('addPost')[0].reset();
      this.clearData();
      e.preventDefault();

    }
    else {
      document.getElementsByName('addPost')[0].reset();
      this.clearData();
      addNewPost(this.state);
      e.preventDefault();
    }

    return false;

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

  handleChange(e){
    const { loggedUser } = this.props;
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
    this.setState({user: loggedUser.name});
  }

  render(){
    const {className, children, loggedUser} = this.props;
    //TODO button type submit
    return(
      <div className={`${clsx(className, styles.root)}`} id="addPostBoard">
        <form name="addPost" onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className={`${styles.postAdd} d-flex flex-column align-items-center justify-content-between`}>
            <input className={`${styles.postAddTitle} align-self-start`} type="text" name='title' placeholder="Title"/>
            <textarea rows="6" name='description' placeholder="Description"/>
            <div className={`row d-flex align-items-center justify-content-between`}>
              <input className={`${styles.postAddMail} col-6`} type="email" name='email' placeholder="email" />
              <p>By: {loggedUser.name}</p>
            </div>
            <input className={`${styles.buttonAdd} col-6`} type="submit" value="Send" component={Button}/>
          </div>
          <select name="status">
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>
        </form>
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  addNewPost: PropTypes.func,
  loggedUser: PropTypes.object,
  clearData: PropTypes.func,
  hours: PropTypes.func,
};
const mapStateToProps = state => ({
  loggedUser: getActive(state)}
);

const mapDispatchToProps = (dispatch) => ({
  addNewPost: (payload) => dispatch(addPostRequest(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
