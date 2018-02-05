import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import NavBarComponent from '../components/NavBar';
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
    const { employee } = this.props;
    return (
      <NavBarComponent employee={employee} logout={this.logout}/>
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
