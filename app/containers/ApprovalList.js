import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class ApprovalList extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    const { employee } = this.props;

    return (
      <div>
        You have no pending approvals
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { employee } = authentication;

    return {
        employee,
    };
}
export default withRouter(connect(mapStateToProps)(ApprovalList))
