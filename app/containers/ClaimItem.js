import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class ClaimItem extends React.Component {
  render() {
    const { employee } = this.props;
    return (
      <div>
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

export default withRouter(connect(mapStateToProps)(ClaimItem))
