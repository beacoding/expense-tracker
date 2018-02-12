var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app.js');

chai.use(chaiHttp);

// get claims test
describe('/GET claim', function(){
    it('should GET all the claims', (done)=> {
        chai.request('http://localhost:3000')
            .get('/claims')
            .end((err, res) => {
                // TODO test for getting all claims
                done();
            });
    });
});

describe('/POST claim', function(){
    it('should add a new claim', (done)=> {
        chai.request('http://localhost:3000')
            .get('/add')
            .end((err, res) => {
                // TODO test for adding one new claim
                done();
            });
    });
});

describe('/PUT claim', function(){
    it('should update claim', (done)=> {
        chai.request('http://localhost:3000')
            .get('/update')
            .end((err, res) => {
                // TODO test for updating claim
                done();
            });
    });
});

describe('/POST claim', function(){
    it('should delete claim', (done)=> {
        chai.request('http://localhost:3000')
            .get('/delete')
            .end((err, res) => {
                // TODO test for deleting claim
                done();
            });
    });
});


