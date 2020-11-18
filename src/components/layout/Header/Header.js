import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import clsx from 'clsx';
import PinDropIcon from '@material-ui/icons/PinDrop';
import { getAll, getActive, changeUserStatus } from '../../../redux/usersRedux';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import Select from 'react-select';

import styles from './Header.module.scss';

class Component extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { active: false};

  // }
  // handleChange(value) {
  //   this.setState({active: value.active});
  //   // console.log(this.state);
  // }
  changeStatus(payload) {
    console.log(payload);
    const { sendStatus } = this.props;
    sendStatus(payload);
  }

  changeUser(e){
    console.log(e.target.value);
    // const { sendStatus } = this.props;
    // sendStatus(e.target.value);
  }
  render(){
    const {className, usersList, children, isLogged} = this.props;
    return(
      <div className={clsx(className, styles.root)}>
        <div className="container-fluid d-flex align-items-center justify-content-center">
          <div className="row justify-content-between w-100">
            <div className="col-4 d-flex align-items-center">
              <a href='/' className={`${styles.title} d-flex align-items-center justify-content-center`}> <PinDropIcon className={styles.icon}/> Bulletin Board</a>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <div className="user-select">
                {console.log(usersList)}
                <select onChange={this.changeUser}>
                  {usersList.map(user => (
                    <option key={user.id} value={user.active}>{user.role}</option>
                  ))}
                </select>
                <Select
                  name="form-field-name"
                  value={'true'}
                  onChange={(payload) =>this.changeStatus(payload.active)}
                  options={
                    usersList.map( user => ({
                      label: user.role,
                      value: user.role,
                      active: user.active,
                    }))
                  }
                />
              </div>
              {isLogged ?  <Button className={styles.link} href='/' name='Logout' onClick={console.log('Logout')}/>  : <Button className={styles.link} href='https://google.com' name='Login'/>}
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  usersList: PropTypes.any,
  isLogged: PropTypes.bool,
  role: PropTypes.bool,
  sendStatus:PropTypes.func,
};

const mapStateToProps = state => ({
  usersList: getAll(state),
  isLogged: getActive(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendStatus: (payload) => dispatch(changeUserStatus(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
