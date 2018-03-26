import {claimItemsHelpers} from '../../app/helpers/claimItems.helpers'
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing distance to amount', function(){
    it('should correctly calculate distance amount', function(){
       var amount = claimItemsHelpers.distanceToAmount(10,100);
        assert.equal(amount, 10000, "result amount should equal 10000s")
    })
})