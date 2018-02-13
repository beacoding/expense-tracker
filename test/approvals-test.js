var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../bin/www');
chai.use(chaiHttp);


//TODO tests for approval limits
describe('/GET approvals', function(){
    it('should GET all the claims', (done)=> {
        chai.request('http://localhost:3000')
            .get('/approvals')
            .end((err, res) => {
                done();
            });
    });
})