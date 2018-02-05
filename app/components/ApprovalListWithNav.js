import React from 'react';
import ApprovalList from '../containers/ApprovalList';
import NavBar from '../containers/NavBar';

const ApprovalListWithNav = () => (
  <div>
    <div className="wrapper">
      <nav id="sidebar">
        <NavBar />
      </nav>
      <div id="content">
        <ApprovalList/>
      </div>
    </div>
  </div>
)

export default ApprovalListWithNav;