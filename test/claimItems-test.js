var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../bin/www');
chai.use(chaiHttp);

// error if cannot get claim items
describe('/GET claimItems', function(){
    // TODO: cannot get claim items
    it('should fail to get claimsItems', (done)=> {
        chai.request('http://localhost:3000')
            .get('/claimItems')
            .end((err, res) => {
                  // res.status.should.be.equal(404);
                done();
            });
    });
});

// successfully get claim items
describe('/GET claimItems', function(){
    // TODO: can get claim items
    it('should GET all the claimsItems', (done)=> {
        chai.request('http://localhost:3000')
            .get('/claimItems')
            .end((err, res) => {
                //  res.status.should.be.equal(200);
                done();
            });
    });
});