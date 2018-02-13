var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../bin/www');
chai.use(chaiHttp);

//TODO tests for employees
describe('/GET employees', function(){
    it('should GET all the employees', (done)=> {
        chai.request('http://localhost:3000')
            .get('/employees')
            .end((err, res) => {
                done();
            });
    });
});