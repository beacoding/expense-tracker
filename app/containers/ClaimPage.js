import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { claimItemsActions } from '../actions';
import { claimsActions } from '../actions';
import ClaimItemContainer from './ClaimItemContainer';

class ClaimPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //let { claim_id } = this.props;
    let claim_id = window.location.pathname.split("/")[2];
    if (claim_id != undefined) {
      this.props.dispatch(claimItemsActions.requestAll(claim_id));
    }
  }

  renderError(error) {
    return <div> {error} </div>
  }

  renderFetching() {
    return <div className="loader"></div>
  }

  render() {
    const { employee, claimItems, claimsMap, isFetching, error } = this.props;

    if (error !== undefined) {
      return this.renderError(error);
    }

    if (isFetching === true) {
      return this.renderFetching();
    }

    let claim_id = window.location.pathname.split("/")[2];

    const claimItemsList  = claimItems[claim_id];
    if (claimItemsList === undefined) {
      return this.renderFetching();
    }


    if (claimsMap === undefined) {
      return this.renderFetching();
    }

    let claim = claimsMap[claim_id]

    return (
      <div className="claimlist-container">
        <div className="page-header">
          <div className="page-title">
            View Claim
          </div>
          <div className="page-route">
            <span className="route-inactive">Home</span>  <span className="route-inactive"> > View Claim</span>  <span className="route-active"> > {claim.description}</span>
          </div>
        </div>
        <div className="claim-list">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount (CAD)</th>
                <th scope="col">Expense Category</th>
              </tr>
            </thead>
            <tbody>
            {
              claimItemsList.map((claimItem) => {
                return <ClaimItemContainer key={claimItem.claim_item_id} employee={employee} claim_item = {claimItem} />
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { authentication, claimItems, claims } = state;
    const { error, isFetching } = claimItems;
    const { employee } = authentication;
    const { claimsMap } = claims
    return {
        employee,
        claimItems,
        isFetching,
        claimsMap,
        error
    };
}

export default withRouter(connect(mapStateToProps)(ClaimPage))
