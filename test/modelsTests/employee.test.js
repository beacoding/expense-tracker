const emp = require('../../models/Employee')
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Employee functions', function () {
    it('should find employee with id', function () {
        return emp.findOneWithPassword("1")
            .then(function (rows) {
                var empFirstName = rows[0].first_name
                console.log("employee first name:" + empFirstName);
                assert.equal(empFirstName, "JaVale");
            })
    })
})
