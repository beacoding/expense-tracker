import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { employeesActions } from '../actions';
import User from '../components/User';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }
    
  componentDidMount() {
    this.props.dispatch(employeesActions.requestAllWithManagers());
  }

  renderEntries() {
    const { employee, users } = this.props;
    return (
      <tbody>
      {Object.entries(users).map((user, i) => {
        var user_entry = user[1]
        return <User
                  key={user_entry.id}
                  user={user_entry}
                  users={users}
                  handleManagerChange={this.props.handleManagerChange}
                  handleToggleAdmin={this.props.handleToggleAdmin}
                  handleEnableUser={this.props.showEnableUserModal}
                  handleDisableUser={this.props.showDisableUserModal}
                  handlePasswordReset={this.props.showPasswordResetModal}
                />
      })}
      </tbody>
    )
  }

  renderEmptyList() {
    return (
      <div className="claim-container">
        No users were found.
      </div>
    )
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() { 
    const { users, isFetching } = this.props;

    if (isFetching) {
      return this.renderFetching();
    }

    if (users.length < 1) {
      return this.renderEmptyList();
    }
    
    return (
      <div className="claim-list">
        <div className="claim-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> Employee ID </th>
                <th scope="col"> Employee Name </th>
                <th scope="col"> Manager Name </th>
                <th scope="col" style={{textAlign: 'center'}}> Reset Password? </th>
                <th scope="col" style={{textAlign: 'center'}}> System Administrator? </th>                
                <th scope="col" style={{textAlign: 'center'}}> Account Status </th>                
              </tr>
            </thead>
              { this.renderEntries() }
          </table>
        </div>
      </div>    

    )
  }
}

function mapStateToProps(state) {
  const { authentication, policies, employees } = state;
  const { employee } = authentication;
  const users = employees.employees_with_managers;
  const employeesOfManagerMap = employees.employeesOfManagerMap;
  const isFetching = employees.isFetching;
  return {
    employee,
    users,
    isFetching
  };
}

export default withRouter(connect(mapStateToProps)(UsersList))
