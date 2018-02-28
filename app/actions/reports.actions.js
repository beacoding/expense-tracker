import { reportsConstants } from '../constants';
import { reportsAPI } from '../api'

export const reportsActions = {
  modifyParams
};

function modifyParams(param_to_change, value) {
  return { type: reportsConstants.MODIFY_PARAMS, param_to_change, value };
}

