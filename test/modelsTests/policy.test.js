const policy = require('../../models/Policy')
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Employee functions', function () {
    it('should find all policies', function () {
        return policy.findAll().then(function (rows) {
            var count = rows.length;
            var name = rows[0].name;
            console.log('policy name: ' + name)
            console.log("total count of policies: " + count);
            assert.equal(count, 3, "total number of policies is 3");
        })
    })

    it('should find all companies', function () {
        return policy.findCompanies().then(function (rows) {
            var count = rows.length;
            console.log('total count of companies: ' + count);
            assert.equal(count, 3, "total number of companies is 3");
        })
    })

    it('should find all expense types', function () {
        return policy.findExpenseTypes().then(function (rows) {
            var count = rows.length
            console.log('total number of expense types: ' + count);
            assert.equal(count, 18, "total number of expense types is 18");
        })
    })

    it('should update policy', function () {
        return policy.updateOne('Maximum Per Diem Amount', 10000).then(function () {
            policy.findAll().then(function (rows) {
                var newAmount = rows[0].value
                console.log("amount of Maximum Per Diem Amount is: " + newAmount);
                assert.equal(newAmount, 10000, "Updated max per diem amount to 10000")
            })
        })
    })
})