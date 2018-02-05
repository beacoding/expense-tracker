import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import ClaimContainer from './ClaimContainer';

class ClaimList extends React.Component {
  constructor(props) {
      super(props);

      this.submitNewClaim = this.submitNewClaim.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(claimsActions.requestAll());
  }

  submitNewClaim() {
    //TODO handle submit new claim
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
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            My Claims
          </div>
          <button className="page-button" onClick={this.submitNewClaim}>Add New Claim</button>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-active"> > Claims</span>
          </div>
        </div>
        <div className="claim-list">
          {Object.entries(claimsMap).map((claim_tuple) => {
            var claim = claim_tuple[1]
              return <ClaimContainer claim={claim} employee={employee} key={claim.claim_id} func={requestAllClaimItems}/>
          })}
        </div>
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
