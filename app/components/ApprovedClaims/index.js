import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ReportsClaimContainer from '../../containers/ReportsClaimContainer';


const ApprovedClaims = ({ props, renderEmptyList, renderError }) => {
  const { employee, approvedClaims, policies, error, isFetching } = props;
  
  if (error !== undefined) {
    return renderError(error);
  }

  if (Object.keys(approvedClaims).length == 0) {
    return renderEmptyList();
  }


  return (
      <div className="claim-list">
        {Object.entries(approvedClaims).map((claim_tuple) => {
          var claim = claim_tuple[1]
            return <ReportsClaimContainer
                      claim={claim}
                      employee={employee}
                      key={claim.claim_id}/>
        })}
    </div>
  )
}

ApprovedClaims.propTypes = {
}

export default ApprovedClaims;