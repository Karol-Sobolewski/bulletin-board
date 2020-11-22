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
changeStatus = (payload) => {
  console.log('user', payload);
  const { sendStatus } = this.props;

  sendStatus({id: payload.id, name: payload.name, role: payload.role, active: payload.active});
};

changeUser(e){
  const { sendStatus } = this.props;
  // sendStatus(e.target.value);
  const id = (e.target[e.target.selectedIndex].getAttribute('id'));
  const role = (e.target[e.target.selectedIndex].getAttribute('role'));
  const name = (e.target[e.target.selectedIndex].getAttribute('name'));
  const active = (e.target[e.target.selectedIndex].getAttribute('active'));

  // const id = e.target.getAttribute('id');
  // const role = e.target.getAttribute('role');
  // const name = e.target.getAttribute('userName');
  // const active = e.target.getAttribute('active');

  console.log('user', e.target);
  // sendStatus({id: id, name: name, role: role, active: active});

}
render(){
  const {className, usersList, children, loggedUser} = this.props;
  return(
    <div className={clsx(className, styles.root)}>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row justify-content-between w-100">
          <div className="col-4 d-flex align-items-center">
            <a href='/' className={`${styles.title} d-flex align-items-center justify-content-center`}> <PinDropIcon className={styles.icon}/> Bulletin Board</a>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <div className="user-select">
              {/* {console.log(usersList)} */}
              <select onChange={(payload) => this.changeUser(payload)}>
                {usersList.map(user => (
                  <option key={user.id} role={user.role} name={user.name} id={user.id} active={user.active.toString()}>{user.name}</option>
                ))}
              </select>
              <Select
                name="form-field-name"
                value={'true'}
                onChange={(payload) =>this.changeStatus(payload)}
                selectOption={'hey'}
                options={
                  usersList.map( user => ({
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    active: user.active,
                    label: user.name,
                    value: user.role,
                  }))
                }
              />
            </div>
            {loggedUser.active ?  <Button className={styles.link} name='Logout' onClick={() => console.log('Logout')}/>  : <Button className={styles.link} href='https://google.com' name='Login'/>}
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
  loggedUser: PropTypes.object,
  role: PropTypes.bool,
  sendStatus:PropTypes.func,
};

const mapStateToProps = state => ({
  usersList: getAll(state),
  loggedUser: getActive(state),
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
