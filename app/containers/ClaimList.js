import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';

class ClaimList extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.requestAll());
  }

  renderError(error) {
    return <div> {error} </div>
  }

  render() {
    const { employee, claimsList, error } = this.props;
    if (error != undefined) {
      return this.renderError(error);
    }

    return (
      <div> 
        {claimsList}
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claims } = state;
    const { employee } = authentication;
    const { claimsList, error } = claims;
    return {
        employee,
        claimsList,
        error
    };
}

export default withRouter(connect(mapStateToProps)(ClaimList))
