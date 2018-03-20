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
        return <User user={user_entry} key={user_entry.id} handleStatusChange={this.props.handleStatusChange} />
      })}
      </tbody>
      )
  }

  renderClickedStatusChange(employee_id) {
    return (
      <tbody>
      </tbody>
    )
  }

  render() { 
    return (
      <div className="claim-list">
        <div className="claim-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> Employee ID </th>
                <th scope="col"> Employee </th>
                <th scope="col"> Manager </th>
                <th scope="col"> Status </th>
                <th scope="col"> </th>                
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
  const employeesOfManagerMap = employees.employeesOfManagerMap
  return {
    employee,
    users
  };
}

export default withRouter(connect(mapStateToProps)(UsersList))
