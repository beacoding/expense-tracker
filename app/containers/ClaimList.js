import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class ClaimList extends React.Component {
  render() {
    const { employee } = this.props;
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claims } = state;
    const { employee } = authentication;
    return {
        employee,
        claims
    };
}

export default withRouter(connect(mapStateToProps)(ClaimList))
