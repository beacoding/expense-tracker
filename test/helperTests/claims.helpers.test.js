/**
 * Created by minnieliu on 2018-03-26.
 */
import {claimsHelpers} from '../../app/helpers/claims.helpers'
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Claims Helpers', function(){
    it('should correctly get Approved for A', function(){
        var status = claimsHelpers.getStatusText("A")
        assert.equal(status, "Approved", "Status A translates to Approved")
    })

    it('should correctly get Declined for D', function(){
        var status = claimsHelpers.getStatusText("D")
        assert.equal(status, "Declined", "Status D translates to Declined")
    })

    it('should correctly get Under Manager Review for s', function(){
        var status = claimsHelpers.getStatusText("S")
        assert.equal(status, "Under Manager Review", "Status S translates to Under Manager Review")
    })

    it('should correctly get Forwarded for Review for F', function(){
        var status = claimsHelpers.getStatusText("F")
        assert.equal(status, "Forwarded for Review", "Status F translates to Forwarded for Review")
    })

    it('should correctly get Not Yet Submitted for other', function(){
        var status = claimsHelpers.getStatusText("other")
        assert.equal(status, "Not Yet Submitted", "Status other translates to Not Yet Submitted")
    })


    it ('should correct calculate total amount of claim', function(){
        var claim = {}
        claim["total_amount"] = 0;
        var claimItem1 = {}
        claimItem1["amount"] = 100.00;
        var claimItem2 = {}
        claimItem2["amount"] = 200.00;
        var claimList= {claims: claimItem1,claimItem2 }
        claimsHelpers.calculateTotal(claim, claimList)
        //console.log("total amount " + claim["total_amount"]);
        assert.equal(claim["total_amount"], 300.00, "Total claim amount should be 300");
    })

    it ('should correct convert UTC string to date string', function(){
        var utcDate = new Date(Date.UTC(2018, 1, 2, 3, 4, 5));
        var dateString = claimsHelpers.toDateString(utcDate);
        console.log("date string: " + dateString)
        assert.equal(dateString, "Thu Feb 01 2018", "Converts UTC date to correct date string")
    })
})
