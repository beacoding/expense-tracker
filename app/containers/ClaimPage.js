import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ClaimPage extends React.Component {
  render() {
    const { employee } = this.props;
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claimItems } = state;
    const { employee } = authentication;
    return {
        employee,
        claimItems
    };
}

export default withRouter(connect(mapStateToProps)(ClaimPage))
