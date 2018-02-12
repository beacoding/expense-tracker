var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../bin/www');
chai.use(chaiHttp);


// post login information
describe('/POST login', function(){
    it('should POST login information', (done)=> {
        let login_info = {
            email: "dwade@domain.com",
            password: "pw123"
        }
        chai.request('http://localhost:3000')
            .post("/login")
            .send(login_info)
            .end((err, res) => {
                res.status.should.be.equal(200);
                chai.request('http://localhost:3000')
                    .get("/index")
                    .end((err, res) => {
                        res.status.should.be.equal(200);
                        done();
                    });
                done();
            });
    });
});
