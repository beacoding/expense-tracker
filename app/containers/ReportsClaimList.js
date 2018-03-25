import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { claimsActions } from '../actions';
import { claimItemsActions } from '../actions';
import ReportsClaimContainer from './ReportsClaimContainer';
import NewClaimModal from './NewClaimModal';

class ReportsClaimList extends React.Component {
  constructor(props) {
    super(props);
  }
    
  componentDidMount() {
    this.props.dispatch(claimsActions.clearAll());
    this.props.dispatch(claimItemsActions.clearAll());
    this.props.dispatch(claimsActions.requestWith({}));
  }
  
  renderError(error) {
    return <div> {error} </div>
  }
  
  renderEmptyList() {
    return (
      <div className="claim-container">
        No claims found with your filter choices.
      </div>
    )
  }

  renderKOI() {
    const { claimsMap } = this.props;
    let koi = {};
    const tranformAcronym = {
      "A": "Approved",
      "D": "Declined",
      "F": "Under Review (Forwarded)",
      "S": "Under Review",
      "P": "Draft"
    }

    for (var key in claimsMap) {
      var claim = claimsMap[key];
      var status = claim.status
      if (!(status in koi)) {
        koi[status] = 0;
      }
      koi[status] += 1;
    }

    return (
      <div className="koi-entry-container">
        {Object.entries(koi).map((koi_tuple, i) => {
          var status = tranformAcronym[koi_tuple[0]]
          var counter = koi_tuple[1];
          return  <span className="koi-entry" key={i}>
                    <span className="koi-entry-header">{status}</span>
                    <span>{counter}</span>
                  </span>
        })}
      </div>
      )
  }
  
  renderFetching() {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    )
  }

  renderEntries() {
    const { employee, claimsMap } = this.props;

    return (
      <div>
        {Object.entries(claimsMap).map((claim_tuple) => {
          var claim = claim_tuple[1];
          return <ReportsClaimContainer claim={claim} employee={employee} key={claim.claim_id}/>
        })}
      </div>
      )
  }

  renderReportsButtons() {
    return (
      <div className="padded-buttons-row">
        <button className="page-button" onClick={this.props.handleAllEntriesGeneration.bind(this, this.props.claimsMap)}> All Entries </button>              
        <button className="page-button" onClick={this.props.handlePayrollGeneration.bind(this, this.props.claimsMap)}> Payroll </button>        
        <button className="page-button" onClick={this.props.handleT24Generation.bind(this, this.props.claimsMap)}> T24 </button>
        <div className="no-select" style={{float: 'right', padding: '10px 15px'}}><label>Export As:</label></div>
      </div>
      )
  }
  
  render() {
    const { employee, claimsMap, error, isFetching, totals, form, claimId } = this.props;
    
    if (error !== undefined) {
      return this.renderError(error);
    }
    
    if (isFetching) {
      return this.renderFetching();
    }
    
    if (!isFetching && (claimsMap == undefined || Object.keys(claimsMap)[0] == undefined)) {
      return this.renderEmptyList();
    }
    
    return (
      <div>
        {this.renderKOI()}
        {this.renderReportsButtons()}
        {this.renderEntries()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication, claims, form } = state;
  const { employee } = authentication;
  const { claimsMap, error, isFetching, claimId } = claims;

  return {
      employee,
      claimsMap,
      error,
      isFetching,
      claimId,
      form
  };
}
export default withRouter(connect(mapStateToProps)(ReportsClaimList))
