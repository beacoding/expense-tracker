/**
 * Created by minnieliu on 2018-03-26.
 */
import {toastrHelpers} from '../../app/helpers/toastr.helpers'
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Toastr Helpers', function(){
    it('should match toastrOptions', function(){
        const toastrOptions = {
            timeOut: 0, // by setting to 0 it will prevent the auto close
            showCloseButton: true// true by default
        }
        const errorOptions = toastrHelpers.getErrorOptions()
        assert.equal(errorOptions['timeOut'], 0)
        assert.equal(errorOptions['showCloseButton'], true)
    })
})
