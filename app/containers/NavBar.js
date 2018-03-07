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

  renderAdmin() {
    const { employee } = this.props;

    if (employee.is_admin === 1) {
      return (
          <div>
          <li><NavLink activeClassName="active" to="/admin/reports"><i className="ion-clipboard"></i>Reports and Files</NavLink></li>            
          <li><NavLink activeClassName="active" to="/admin/users"><i className="ion-person-stalker"></i>User Management</NavLink></li>
          <li><NavLink activeClassName="active" to="/admin/limits"><i className="ion-android-options"></i>Approval Limits</NavLink></li>
          <li><NavLink activeClassName="active" to="/admin/policies"><i className="ion-android-clipboard"></i>Policies</NavLink></li>
          </div>
        )
    }
  }

  render() {
    const { employee } = this.props;
    return (
      <div>
        <div className="logo">
          <img src="/assets/img/logo.png"/>
        </div>
        <div className="welcome-user">
          <h4>Welcome,</h4>
          <h4>
            {employee.first_name + " " + employee.last_name + "!"}
          </h4>
        </div>
        <ul className="list-unstyled components" >
          <li><NavLink activeClassName="active" to="/claims"><i className="ion-android-list"></i>My Claims</NavLink></li>
          <li><NavLink activeClassName="active" to="/approvals"><i className="ion-android-checkmark-circle"></i>Approvals</NavLink></li>
          {this.renderAdmin()}
          <li><NavLink activeClassName="active" to="/profile"><i className="ion-gear-a"></i>Profile</NavLink></li>
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
