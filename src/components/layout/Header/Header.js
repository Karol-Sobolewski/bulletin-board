import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import clsx from 'clsx';
import PinDropIcon from '@material-ui/icons/PinDrop';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
// import Button from '@material-ui/core/Button';

import styles from './Header.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row justify-content-between w-100">
        <div className="col-4 d-flex align-items-center">
          <a href='/' className={`${styles.title} d-flex align-items-center justify-content-center`}> <PinDropIcon className={styles.icon}/> Bulletin Board</a>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center">
          <div className="user-select">
            <select>
              <option value="0">Select user:</option>
              <option value="1">Not Logged</option>
              <option value="2">Logged User</option>
              <option value="3">Admin</option>
            </select>
          </div>
          <Button className={styles.link} href='https://google.com' name='Login'/></div>
      </div>
      {children}
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
