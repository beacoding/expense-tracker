import React from 'react';
import ClaimList from '../containers/ClaimList';
import ClaimPage from '../containers/ClaimPage';
import NavBar from '../containers/NavBar';

const ClaimListWithNav = () => (
  <div>
    <div className="wrapper">
      <nav id="sidebar">
        <NavBar />
      </nav>
      <div id="content">
        <ClaimList />
      </div>
    </div>
  </div>
)

export default ClaimListWithNav;