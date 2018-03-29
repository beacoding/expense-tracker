const emp = require('../../models/Employee')
var assert = require('chai').assert;
var chaiHttp = require('chai-http');

describe('Testing Employee functions', function () {

    it('should find employee with email as key', function(){
        return emp.findOne("dwade@domain.ca")
            .then(function(rows){
                var empFirstName = rows[0].first_name
                console.log("find by key: "+ empFirstName);
                assert.equal(empFirstName, "Dwayne");
            })
    })

    it('should find employee with email as key', function(){
        return emp.findOne("1")
            .then(function(rows){
                var empFirstName = rows[0].first_name
                console.log("find by key: "+ empFirstName);
                assert.equal(empFirstName, "JaVale");
            })
    })

    it('should find employee with id', function () {
        return emp.findOneWithPassword("1")
            .then(function (rows) {
                var empFirstName = rows[0].first_name
                console.log("employee first name:" + empFirstName);
                assert.equal(empFirstName, "JaVale");
            })
    })

    it('should set manager for employee', function(){
        return emp.assignManagerById('3', '2').then(function (rows){
            emp.findOne('3').then(function (rows1){
                var managerId = rows1[0].manager_id
                console.log("manager id: " + managerId)
                assert.equal(managerId , '2', "successfully set manager ID to 2 for employee 3")
            })
        })
    })

    it ('should toggle admin of employee', function() {
        return emp.findOneWithPassword('3').then(function (rows){
            var wasAdmin = rows[0].is_admin;
            emp.toggleAdmin('3').then(function () {
                emp.findOneWithPassword('3').then(function (rows1) {
                    var isAdmin = rows1[0].is_admin;
                    console.log("was admin:" + wasAdmin+ " is admin: " + isAdmin);
                    assert.notEqual(isAdmin , wasAdmin, "successfully set manager ID to 2 for employee 3")
                })
            })
        })

    })

    it ('should transfer employee from one manager to another', function() {
        return emp.findOne('3').then(function (rows){
            var prevManager = rows[0].manager_id
            console.log('previous manager: ' + prevManager)
            emp.transferBetweenManagersById('2', '5').then(function () {
                emp.findOne('3').then(function (rows1) {
                    var curManager = rows1[0].manager_id
                    console.log("prev manager:" + prevManager+ " cur manager: " + curManager);
                    assert.equal(curManager , '5', "successfully changed manager with id 5")
                })
            })
        })
    })

    it ('should disable employee', function() {
        return emp.disableOne('3').then(function(){
            emp.findOne('3').then(function(rows){
                var isActive = rows[0].is_active;
                console.log('is active: ' + isActive);
                assert.equal(isActive, '0', "employee should be deactivated");
            })
        })
    })

    it ('should enable employee', function(){
        return emp.enableOne('3').then(function(){
            emp.findOne('3').then(function(rows){
                var isActive = rows[0].is_active;
                console.log('is active: ' + isActive);
                assert.equal(isActive, '1', "employee should be deactivated");
            })
        })

    })

    it ('should find all employees', function(){
        return emp.findAll("3").then(function(rows){
            var count = rows.length;
            console.log("length of rows: " + count);
            //assert.equal(count, '197', "should get all 197 records");
        })
    })


    it ('should find all employees along with managers', function(){
        return emp.findAllWithManagers("3").then(function(rows){
            var count = rows.length;
            console.log("length of rows: " + count);
            //assert.equal(count, '197', "should get all 197 records");
        })
    })

    it ('should find all employees along with managers', function(){
        return emp.findAllWithManagerID("5").then(function(rows){
            var count = rows.length
            console.log("length of rows with manager 2: " + count);
            //assert.equal(count, '32', "should get all 197 records");
        })
    })

    it ('should find employees satisfying params', function(){
        var params = {employee_id: '2'}
        return emp.findAllWithParams(params).then(function(rows){
            var fullName = rows[0].employee_name
            console.log("employee name: " + fullName);
            assert.equal(fullName, 'Kyrie Irving', 'Gets full name of the employee')
        })
    })

    it ('should find employees satisfying params', function(){
        var params = {employee_name: 'Kyrie'}
        return emp.findAllWithParams(params).then(function(rows){
            var empId = rows[0].id
            console.log("employee ID: " + empId);
            assert.equal(empId, '2', 'Gets id of the employee')
        })
    })

    it ('should find employees satisfying params', function(){

        var params = {manager_id: '2'}
        return emp.assignManagerById('3', '2').then(function(){
            emp.findAllWithParams(params).then(function(rows){
                var fullName = rows[0].employee_name
                console.log("employee name: " + fullName);
                assert.equal(fullName, 'Dwayne Wade', 'Gets full name of the employee')
            })
        })
    })

    it ('should find employees satisfying params', function(){
        var params = {manager_name: 'Kyrie'}
        return emp.findAllWithParams(params).then(function(rows){
            var fullName = rows[0].employee_name
            console.log("employee name: " + fullName);
            assert.equal(fullName, 'Dwayne Wade', 'Gets full name of the employee')
        })
    })

    it('should add new employee', function(){
        var id = Math.floor(Math.random()* 999999999);
        var employee = {
            id: id,
            first_name: 'Frank',
            last_name: 'Ocean',
            email: 'focean' + id + '@domain.ca',
            password: 'pw123',
            manager_id: '2',
            is_admin: '0'
        }
        return emp.addOne(employee).then(function(){
            emp.findOne(id).then(function(row){
                var firstName = row[0].first_name;
                console.log("first name of new emp: " + firstName);
                assert.equal(firstName, "Frank")
            })
        })
    })

    it ('should update password', function(){
        var id = Math.floor(Math.random()* 999999999);
        var employee = {
            id: id,
            first_name: 'Frank',
            last_name: 'Ocean',
            email: 'focean@domain.ca',
            password: 'pw1234',
            manager_id: '2',
            is_admin: '0'
        }
        return emp.updatePassword(employee).then(function(){
          emp.findOneWithPassword(id).then(function(row){
              var newPass = row[0].password;
              console.log("new password: " + newPass);
              assert.equals(newPass, "pw1234")
          })
        })
    })
})
