import React from 'react';
import ClaimList from '../containers/ClaimList';
import ClaimPage from '../containers/ClaimPage';
import NavBar from '../containers/NavBar';

const ClaimPageWithNav = () => (
  <div>
    <div className="wrapper">
      <nav id="sidebar">
        <NavBar />
      </nav>
      <div id="content">
        <ClaimPage />
      </div>
    </div>
  </div>
)

export default ClaimPageWithNav;