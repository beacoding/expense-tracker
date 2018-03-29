/**
 * Created by minnieliu on 2018-03-26.
 */
import {toastrHelpers} from '../../app/helpers/toastr.helpers'
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Toastr Helpers', function(){
    it('should match toastrOptions', function(){

        const errorOptions = toastrHelpers.getErrorOptions()
        assert.equal(errorOptions['timeOut'], 10000)
        assert.equal(errorOptions['showCloseButton'], true)
    })
})
