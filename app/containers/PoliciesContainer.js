import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { policiesActions } from '../actions';
import InlineEdit from 'react-edit-inline';

class PoliciesContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(policiesActions.requestAll());
    this.handleEditLimit = this.handleEditLimit.bind(this);
    // import all policies
  }

  handleEditLimit(name, data) {
    let new_value = parseInt(data["new_policy_value"]);
    this.props.dispatch(policiesActions.updateValue(name, new_value));
  }

  renderEntries() {
    const { policies } = this.props.policies
    return ( 
        <tbody>
        { Object.entries(policies).map((policy, i) => {
          var key = policy[0];
          var value = policy[1];
          return (<tr key={i}>
            <td>{key}</td>
            <td>$<InlineEdit paramName="new_policy_value" change={this.handleEditLimit.bind(this, key)} text= {value} />  <i className="ion-edit"></i> </td>
            </tr>)
        })}
        </tbody>

      )
  }

  render() {
    const { employee } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="page-title">
           Policies
          </div>
          <div className="page-route">
            <span className="route-inactive">Home > Admin</span>  <span className="route-active"> > Policies </span>
          </div>
        </div>
        <div className="claim-list">
          <div className="claim-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"> Policy </th>
                  <th scope="col"> Value </th>
                </tr>
              </thead>
                { this.renderEntries() }
            </table>
          </div>
        </div>   
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, policies } = state;
    const { employee } = authentication;
    return {
      employee,
      policies
    };
}

export default withRouter(connect(mapStateToProps)(PoliciesContainer))
