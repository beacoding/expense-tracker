import {claimItemsHelpers} from '../../app/helpers/claimItems.helpers'
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing ClaimItems helpers', function(){
    it('should correctly calculate distance to amount', function(){
       var amount = claimItemsHelpers.distanceToAmount(10,100);
        assert.equal(amount, 1000, "amount should equal 1000")
    })

    it('should correctly calculate amount to distance', function(){
        var distance = claimItemsHelpers.amountToDistance(1000,10);
        assert.equal(distance, 100, "distance should eqaul 100");
    })

    it('should encode file to 64 bit', function(){
        // TODO
    })

})
