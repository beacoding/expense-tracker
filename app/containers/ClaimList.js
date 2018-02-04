import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import ClaimContainer from './ClaimContainer';

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

  renderFetching() {
    return <div></div>
  }

  render() {
    const { employee, claimsMap, error, isFetching, totals, requestAllClaimItems } = this.props;
    if (error !== undefined) {
      return this.renderError(error);
    }

    if (isFetching || claimsMap == undefined) {
      return this.renderFetching();
    }

    return (
      <div>
        {Object.entries(claimsMap).map((claim_tuple) => {
          var claim = claim_tuple[1]
            return <ClaimContainer claim={claim} employee={employee} key={claim.claim_id} func={requestAllClaimItems}/>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claims } = state;
    const { employee } = authentication;
    const { claimsMap, error, isFetching } = claims;

    return {
        employee,
        claimsMap,
        error,
        isFetching,
    };
}
export default withRouter(connect(mapStateToProps)(ClaimList))
