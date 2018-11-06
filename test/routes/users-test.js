let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let User=require('../../models/users');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Users', function () {
    // TODO
    describe('Get/', function () {
        beforeEach (function (done){
            var newUser = new User({
                username: "john",
                password: "123456",
                usertype:"user"
            });
            newUser.save(function(err){
                done();
            });
        });
        afterEach(function(done) {
            User.collection.drop();
            done();
        });
        describe('GET /users',  () => {
            it('should return all the users in an array', function(done) {
                chai.request(server)
                    .get('/users')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (user) => {
                            return {
                                username: user.username,
                                password: user.password,
                                usertype:user.usertype
                            }
                        });
                        expect(result).to.include( {  username: "john",
                            password: "123456",
                            usertype:"user"
                        } );
                        done();
                    });
            });
        });


    });
})