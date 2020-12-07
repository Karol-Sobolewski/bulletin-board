import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux';
import { getActive } from '../../../redux/usersRedux';
import Button from '../../common/Button/Button';
import styles from './PostAdd.module.scss';
import {PostForm} from '../../common/PostForm/PostForm';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', created: new Date(), status: 'draft'};
  }

  render(){
    const {className, children} = this.props;
    return(
      <div className={`${clsx(className, styles.root)}`} id="addPostBoard">
        <PostForm type={'Add'} />
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
const mapStateToProps = state => ({
  loggedUser: getActive(state)}
);

// const mapDispatchToProps = (dispatch) => ({
// addNewPost: (payload) => dispatch(addPostRequest(payload)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
