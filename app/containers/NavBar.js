import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { authActions } from '../actions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/img/logo.png"/>
        </div>
        <ul className="list-unstyled components" >
          <li><NavLink activeClassName="active" to="/claims"><i className="ion-android-list"></i>My Claims</NavLink></li>
          <li><NavLink activeClassName="active" to="/approvals"><i className="ion-android-checkmark-circle"></i>Approvals</NavLink></li>
          <li><NavLink activeClassName="active" to="/reports"><i className="ion-clipboard"></i>Reporting</NavLink></li>
          <li><a href="#"><i className="ion-person-stalker"></i>Users</a></li>
          <li><a href="#"><i className="ion-android-options"></i>Approval Limits</a></li>
          <li><a href="#"><i className="ion-gear-a"></i>Settings</a></li>
          <li style={{cursor: "pointer"}} onClick={this.logout}><a><i className="ion-power"></i>Log out</a></li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { employee } = authentication;
  return {
    employee
  };
}

export default withRouter(connect(mapStateToProps)(NavBar))
