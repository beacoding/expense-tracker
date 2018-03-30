const empCostCentre = require('../../models/EmployeeCostCentre')
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Employee functions', function () {

    it('should find employee with email as key', function () {
        return empCostCentre.findAll()
            .then(function (rows) {
                var count = rows.length
                console.log("cost centre length:" + count);
                assert.equal(count, 429);
            })
    })

    it('should find employees cost center', function () {
        var employee = {
            id: 2,
            first_name: 'Kyrie',
            last_name: 'Irving'
        }
        return empCostCentre.findAllByEmployee(employee).then(function (rows) {
            var count = rows.length;
            console.log("cost centers of Kyrie: " + count);
            assert.equal(count, 1);
        })
    })

    it('should find managers to forward to', function () {
        return empCostCentre.findForwardManagers(0, 2000).then(function (rows) {
            var forwardManagerName = rows[0].manager_name;
            var forwardManagerID = rows[0].employee_id
            console.log('Manager: ' + forwardManagerID + ' ' + forwardManagerName)
            assert.equal(forwardManagerName, 'JaVale McGee');
            assert.equal(forwardManagerID, 1)
        })
    })

    it('update cost center approvals', function () {
        return empCostCentre.updateOne(78, 2, 6000).then(function () {
            var employee = {
                id: 78,
                first_name: 'Bryce',
                last_name: 'Rice'
            }
            empCostCentre.findAllByEmployee(employee).then(function (rows) {
                var approvalLimit = rows[0].approval_limit
                console.log("New Approval Limit: " + approvalLimit);
                assert.equal(approvalLimit, 6000);
            })
        })
    })

    it('update cost center approvals with no limit', function () {
        return empCostCentre.updateOne(78, 2).then(function () {
            var employee = {
                id: 78,
                first_name: 'Bryce',
                last_name: 'Rice'
            }
            empCostCentre.findAllByEmployee(employee).then(function (rows) {
                var approvalLimit = rows[0].approval_limit;
                console.log("New Approval Limit: " + approvalLimit);
                assert.equal(approvalLimit, null);
            })
        })
    })

    it('should revoke approval rights of cost center of employee', function () {
        // delete the only cost centre of Bryce Rice
        return empCostCentre.revokeOne(78, 2).then(function () {
            var employee = {
                id: 78,
                first_name: 'Bryce',
                last_name: 'Rice'
            }
            empCostCentre.findAllByEmployee(employee).then(function (rows) {
                var count = rows.length;
                console.log("Cost Centers of Bryce Rice: " + count);
                assert.equal(count, 0)
            })
        })
    })

    it('should find all with given params', function () {
        var params = {employee_name: 'Kyrie'}
        return empCostCentre.findAllWithParams(params).then(function (rows) {
            var empID = rows[0].employee_id
            console.log("employee id: " + empID);
            assert.equal(empID, 2, 'Gets correct id of the employee')
        })
    })

    it('should find all with given params', function () {
        var params = {employee_id: 2}
        return empCostCentre.findAllWithParams(params).then(function (rows) {
            var managerName = rows[0].manager_name
            console.log("manager name: " + managerName);
            assert.equal('JaVale McGee', managerName, 'Gets correct manager name of the employee')
        })
    })


    it('should find all with given params', function () {
        var params = {cost_centre_id: 0}
        return empCostCentre.findAllWithParams(params).then(function (rows) {
            var empID = rows[0].employee_id
            console.log("employee id: " + empID);
            assert.equal(1, empID, 'Gets correct id of the employee with cost centre')
        })
    })

    it('should find all with given params', function () {
        var params = {approval_limit: 750}
        return empCostCentre.findAllWithParams(params).then(function (rows) {
            var empID = rows[0].employee_id
            console.log("employee id with limit 750: " + empID);
            assert.equal(1, empID, 'Gets correct id of the employee with cost centre')
        })
    })

    it('should find all cost centres', function () {
        return empCostCentre.findAllCostCentres().then(function (rows) {
            var count = rows.length;
            console.log("all cost centers count: " + count)
            assert.equal(count, 88)
        })
    })

    it ('should grant approval rights of employee to cost centre', function(){
        var body = {
            employee_id: 78,
            cost_centre_id: 2,
            approval_limit: 6000
        }

        var employee = {
            id: 78,
            first_name: 'Bryce',
            last_name: 'Rice'
        }
        return empCostCentre.addOne(body).then(function(){
            empCostCentre.findAllByEmployee(employee).then(function(rows){
                var costCenter = rows[0].cost_centre_id;
                console.log("cost center id: " + costCenter);
                assert.equal(costCenter, 2)
            })
        })
    })
})