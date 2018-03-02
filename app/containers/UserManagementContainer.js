import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class UserMangementContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="claimlist-container">
      </div>
      )
  }
}

function mapStateToProps(state) {
  const { authentication, policies } = state;
  const { employee } = authentication;
  return {
    employee,
  };
}

export default withRouter(connect(mapStateToProps)(UserMangementContainer))