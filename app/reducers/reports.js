import { reportsConstants } from '../constants';

const initialState = {
  params: {
    employee_id: null,
    manager_id: null,
    submitted: null,
    approved: true,
    declined: true,
    pending: true,
    drafts: true,
    start: null,
    end: null
  }
}

const reports = (state = initialState, action) => {
  switch (action.type) {
    case reportsConstants.MODIFY_PARAMS:
      var param_to_change = action.param_to_change;
      var value = action.value
      var newParams = Object.assign({}, state.params);
      newParams[param_to_change] = value;

      return Object.assign({}, state, {
        params: newParams
      });
    default:
      return state;
  }
}

export default reports;