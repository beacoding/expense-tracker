import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';

const User = ({ user, users, isSelf, handleManagerChange, handleToggleAdmin, handleEnableUser, handleDisableUser, handlePasswordReset }) => {
  const {
    id,
    manager_id,
    employee_name,
    manager_name,
    is_active,
    is_admin
  } = user;
  
  const options = users.map((user) => {
    return { value: user.id, label: user.employee_name }
  })
  const filterOptions = createFilterOptions({ options });
  const value = user.manager_id;
  
  return (
    <tr>
      <td style={{textAlign: 'center', width: 125 + 'px'}}>{id}</td>
      <td style={{width: 300 + 'px'}}>{employee_name}</td>
      <td style={{width: 300 + 'px'}}>
        <Select
          value={value}
          options={options}
          filterOptions={filterOptions}
          onChange={handleManagerChange.bind(this, user)}
          onBlur={() => {}}
        />
      </td>
      {/* Reset Password */}
      { is_active === 1 && <td style={{textAlign: 'center'}}> <i className="ion-unlocked pointer" style={{fontSize: 18 + 'px'}} onClick={handlePasswordReset.bind(this, user)}></i></td> }
      { is_active === 0 && <td style={{textAlign: 'center'}}> N/A </td> }
      {/* System Administrator */}
      { !isSelf && is_active === 1 && is_admin === 1 && <td style={{textAlign: 'center'}}> <i className="ion-toggle-filled pointer" style={{fontSize: 26 + 'px'}} onClick={handleToggleAdmin.bind(this, user)}></i></td> }      
      { !isSelf && is_active === 1 && is_admin === 0 && <td style={{textAlign: 'center'}}> <i className="ion-toggle pointer" style={{fontSize: 26 + 'px'}} onClick={handleToggleAdmin.bind(this, user)}></i></td> }
      { (isSelf || is_active === 0) && <td style={{textAlign: 'center'}}> N/A </td> }      
      {/* Account Status */}
      { (!isSelf && is_active === 1) && <td style={{textAlign: 'center'}}> <i className="ion-toggle-filled pointer" style={{fontSize: 26 + 'px'}} onClick={handleDisableUser.bind(this, user)}></i></td> }
      { (!isSelf && is_active === 0) && <td style={{textAlign: 'center'}}> <i className="ion-toggle pointer" style={{fontSize: 26 + 'px'}} onClick={handleEnableUser.bind(this, user)}></i></td> }
      { isSelf && <td style={{textAlign: 'center'}}> N/A </td> }
    </tr>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    employee_name: PropTypes.string,
    manager_id: PropTypes.number,    
    manager_name: PropTypes.string,
    is_active: PropTypes.number.isRequired,
    is_admin: PropTypes.number.isRequired
  }).isRequired
}

export default User;