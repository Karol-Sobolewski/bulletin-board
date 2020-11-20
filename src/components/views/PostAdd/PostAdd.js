import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import styles from './PostAdd.module.scss';
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: '', user: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { addNewPost, clearData } = this.props;
    if (!this.state.title || !this.state.description) {
      alert('Please fill all fields' );
      e.preventDefault();
    }
    else{
      addNewPost(this.state);
      document.getElementsByName('addPost')[0].reset();
      this.clearData();
      e.preventDefault();
    }
    return false;

  }

  clearData() {
    this.setState({
      title: '',
      description: '',
      user: '',
    });
  }

  handleChange(e){
    const { loggedUser } = this.props;
    const target = e.target;
    const value = target.value;
    const name = target.name;
    // console.log('e.target');
    this.setState({[name]: value});
    this.setState({user: loggedUser.name});
  }

  render(){
    const {className, children, loggedUser} = this.props;
    return(
      <div className={`${clsx(className, styles.root)}`}>
        <form name="addPost" onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className={`${styles.postAdd} d-flex flex-column align-items-center justify-content-between`}>
            <input className={`${styles.postAddTitle} align-self-start`} type="text" name='title' placeholder="Title"/>
            <textarea rows="6" name='description' placeholder="Description"/>
            <p className={`align-self-end`}>By: {loggedUser.name}</p>
            <input type="submit" value="Send" />
          </div>
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
};
const mapStateToProps = state => ({
  loggedUser: getActive(state)}
);

const mapDispatchToProps = (dispatch) => ({
  addNewPost: (payload) => dispatch(addPost(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
