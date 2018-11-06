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
    describe('Post/', function (){
        describe('POST /users', function () {
            it('should return confirmation message and update datastore', function (done) {
                let user = {
                    username: "john",
                    password: "123456",
                    usertype:"user"
                };
                chai.request(server)
                    .post('/users')
                    .send(user)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('User Successfully Added!' );
                        done();
                    });
            });
            after(function (done) {
                chai.request(server)
                    .get('/users/')
                    .end(function (err, res) {
                        let result = _.map(res.body, (user) => {
                            return {
                                username: user.username,
                                password: user.password,
                                usertype:user.usertype
                            };
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

    describe('Put/', function () {
        describe('PUT /users/:id', () => {
            describe('when id is correct', function (done) {
                it('should return the updated message', function (done) {
                    let user = {
                        username: "john",
                        password: "654321",
                        usertype:"user"
                    };
                    chai.request(server)
                        .get('/users')
                        .end(function (err, res) {
                            const userId = res.body[0]._id;
                            chai.request(server)
                                .put('/users/'+userId)
                                .send(user)
                                .end(function (err, res) {
                                    expect(res).to.have.status(200);
                                    expect(res.body).to.have.property('message').equal('User Successfully UpDated!');
                                    done();
                                });
                        });
                });
                after(function (done) {
                    chai.request(server)
                        .get('/users')
                        .end(function (err, res) {
                            let result = _.map(res.body, (user) => {
                                return {
                                    username: user.username,
                                    password: user.password,
                                    usertype:user.usertype
                                };
                            });
                            expect(result).to.include( {  username: "john",
                                password: "654321",
                                usertype:"user"
                            } );
                            done();
                        });
                });
            });
            describe('when id is wrong', function (done) {
                it('should return a 404 and a message for invalid user id', function (done) {
                    chai.request(server)
                        .put('/users/1100001')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'User NOT Found!');
                            done();
                        });
                });
            });
        });
    });

})