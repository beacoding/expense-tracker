import { employeesConstants } from '../constants';
import { employeesAPI } from '../api'

export const employeesActions = {
  requestAll,
  requestAllWithManagers,
  requestEmployees,
  requestEmployee,
  addEmployee,
  updatePassword,
  resetPassword,
  assignManager,
  enableEmployee,
  disableEmployee,
  toggleAdmin,
  modifyParams,
  requestWith
};

function requestAll() {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestAll().then(
      res => {
        return dispatch(success(res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEES }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES, employees }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES, error }}
}

function requestAllWithManagers() {
  return dispatch => {
    dispatch(request());
    return employeesAPI.requestAllWithManagers().then(
      res => {
        return dispatch(success(res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request() { return { type: employeesConstants.REQUEST_EMPLOYEES_WITH_MANAGERS }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES_WITH_MANAGERS, employees }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES_MANAGERS, error }}
}

function updatePassword(employee) {
  return dispatch => {
    dispatch(request(employee));
    return employeesAPI.updatePassword(employee).then(
      res => {
        return dispatch(success(employee))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  }
  
  function request(employee) { return { type: employeesConstants.UPDATE_PASSWORD_REQUEST, employee }}
  function success(employee) { return { type: employeesConstants.UPDATE_PASSWORD_SUCCESS, employee }}
  function failure(error) { return { type: employeesConstants.UPDATE_PASSWORD_FAILURE, error }}
}

function resetPassword(employee) {
  return dispatch => {
    dispatch(request(employee));
    return employeesAPI.resetPassword(employee).then(
      res => {
        return dispatch(success(employee))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  }
  
  function request(employee) { return { type: employeesConstants.RESET_PASSWORD_REQUEST, employee }}
  function success(employee) { return { type: employeesConstants.RESET_PASSWORD_SUCCESS, employee }}
  function failure(error) { return { type: employeesConstants.RESET_PASSWORD_FAILURE, error }}
}

function requestEmployees(manager_id) {
  return dispatch => {
    dispatch(request(manager_id));
    return employeesAPI.requestEmployees(manager_id).then(
      res => {
        return dispatch(success(res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(manager_id) { return { type: employeesConstants.REQUEST_EMPLOYEES_OF_MANAGER, manager_id }}
  function success(employees) { return { type: employeesConstants.RECEIVE_EMPLOYEES_OF_MANAGER, employees, manager_id }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEES_OF_MANAGER, error }}
}

function disableEmployee(employee_id, manager_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.disableEmployee(employee_id, manager_id).then(
      res => {
        return dispatch(success(employee_id, res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.DISABLE_EMPLOYEE_REQUEST, employee_id }}
  function success(employee_id, employees) { return { type: employeesConstants.DISABLE_EMPLOYEE_SUCCESS, employee_id, employees }}
  function failure(error) { return { type: employeesConstants.DISABLE_EMPLOYEE_FAILURE, error }}
}

function enableEmployee(employee_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.enableEmployee(employee_id).then(
      res => {
        return dispatch(success(employee_id, res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.ENABLE_EMPLOYEE_REQUEST, employee_id }}
  function success(employee_id, employees) { return { type: employeesConstants.ENABLE_EMPLOYEE_SUCCESS, employee_id, employees }}
  function failure(error) { return { type: employeesConstants.ENABLE_EMPLOYEE_FAILURE, error }}
}

function toggleAdmin(employee_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.toggleAdmin(employee_id).then(
      res => {
        return dispatch(success(employee_id, res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.TOGGLE_ADMIN_REQUEST, employee_id }}
  function success(employee_id, employees) { return { type: employeesConstants.TOGGLE_ADMIN_SUCCESS, employee_id, employees }}
  function failure(error) { return { type: employeesConstants.TOGGLE_ADMIN_FAILURE, error }}
}

function assignManager(employee_id, manager_id) {
  return dispatch => {
    dispatch(request(employee_id, manager_id));
    return employeesAPI.assignManager(employee_id, manager_id).then(
      res => {
        return dispatch(success(employee_id, manager_id, res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(employee_id, manager_id) { return { type: employeesConstants.ASSIGN_MANAGER_REQUEST, employee_id, manager_id }}
  function success(employee_id, manager_id, employees) { return { type: employeesConstants.ASSIGN_MANAGER_SUCCESS, employee_id, manager_id, employees }}
  function failure(error) { return { type: employeesConstants.ASSIGN_MANAGER_FAILURE, error }}
}

function requestWith(params) {
  return dispatch => {
    dispatch(request());
    employeesAPI.requestWith(params).then(
      res => {
        return dispatch(success(res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    );

    function request() { return { type: employeesConstants.REQUEST_WITH }}
    function success(employees) { return { type: employeesConstants.RECEIVE_WITH, employees }}
    function failure(error) { return { type: employeesConstants.FAILURE_WITH, error }}
  }
}

function requestEmployee(employee_id) {
  return dispatch => {
    dispatch(request(employee_id));
    return employeesAPI.requestEmployee(employee_id).then(
      res => {
        return dispatch(success(res.employee))
      },
      error => {
        return dispatch(failure(error))
      }
    );
  };
  
  function request(employee_id) { return { type: employeesConstants.REQUEST_EMPLOYEE, employee_id }}
  function success(employee) { return { type: employeesConstants.RECEIVE_EMPLOYEE, employee }}
  function failure(error) { return { type: employeesConstants.FAILURE_EMPLOYEE, error }}
}

function addEmployee(newEmployee) {
  return dispatch => {
    dispatch(request(newEmployee));
    return employeesAPI.addEmployee(newEmployee).then(
      res => {
        return dispatch(success(newEmployee, res.employees))
      },
      error => {
        return dispatch(failure(error))
      }
    )
  };
  function request(newEmployee) { return { type: employeesConstants.ADD_EMPLOYEE_REQUEST, newEmployee }}
  function success(newEmployee, employees) { return { type: employeesConstants.ADD_EMPLOYEE_SUCCESS, newEmployee, employees }}
  function failure(error) { return { type: employeesConstants.ADD_EMPLOYEE_FAILURE, error }}
}

function modifyParams(param_to_change, value) {
  return { type: employeesConstants.MODIFY_PARAMS, param_to_change, value };
}
