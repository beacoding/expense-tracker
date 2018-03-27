import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { policiesActions } from '../actions';
import { RIEInput, RIETextArea, RIENumber } from 'riek'
import { toastr } from "react-redux-toastr";
import { toastrHelpers } from "../helpers";

class PoliciesContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(policiesActions.requestAll());
    this.handleEditLimit = this.handleEditLimit.bind(this);
    // import all policies
  }

  handleEditLimit(name, data) {
    let new_value = parseFloat(data["new_policy_value"]);
    this.props.dispatch(policiesActions.updateValue(name, new_value)).then((res) => {
      if (res.type === "UPDATE_POLICIES_SUCCESS") {
        toastr.removeByType("error");
        toastr.success('Policy Updated', 'Policy has been successfully updated.');
      } else {
        toastr.removeByType("error");
        toastr.error('Error Updating Policy', 'Please try again.', toastrHelpers.getErrorOptions())
      }
    });
  }

  isLimitInputAcceptable(limitInput) {
    var floatRegex = /^[0-9]*\.?[0-9]+/;
    return floatRegex.test(limitInput);
  }

  createPolicy() {
    this.setState({
      rows: this.state.rows.push(<tr key={i}>
            <td><RIEInput propName="new_policy_value"/>  <i className="ion-edit"></i></td>
            <td>$<RIEInput propName="new_policy_value"/>  <i className="ion-edit"></i> </td>
            </tr>)
    })
  }

  renderFetching() {
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
            <div className="loader">
              <div className="spinner"></div>
            </div>
          </div>
        </div>   
      </div>
    )
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
            <td>$<RIENumber propName="new_policy_value" change={this.handleEditLimit.bind(this, key)} value={value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} validate={this.isLimitInputAcceptable}/>  <i className="ion-edit"></i> </td>
            </tr>)
        })}
        </tbody>
      )
  }

  render() {
    const { employee, isFetching } = this.props;

    if (isFetching) {
      return this.renderFetching();
    }

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
    const { isFetching } = policies;
    return {
      employee,
      policies,
      isFetching
    };
}

export default withRouter(connect(mapStateToProps)(PoliciesContainer))
