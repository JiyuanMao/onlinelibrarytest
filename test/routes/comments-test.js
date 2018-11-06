let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let Comment=require('../../models/comments');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Comments', function () {
    // TODO
    describe('Get/', function () {
        beforeEach (function (done){
            var newComment = new Comment({
                text: "it is very useful",
                bookname: "Building Web Sites All-in-One Desk Reference For Dummies",
                username: "john"
            });
            newComment.save(function(err){
                done();
            });
        });
        afterEach(function(done) {
            Comment.collection.drop();
            done();
        });
        describe('GET /comments/:bookname', () => {
            describe('when book name is correct', function(done) {
                it('should return the comments you search for', function (done) {
                    chai.request(server)
                        .get('/comments/Building Web Sites All-in-One Desk Reference For Dummies')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(1);
                            let result = _.map(res.body, (comment) => {
                                return {
                                    text: comment.text,
                                    username: comment.username,
                                    bookname: comment.bookname,
                                }
                            });
                            expect(result).to.include({
                                text: "it is very useful",
                                bookname: "Building Web Sites All-in-One Desk Reference For Dummies",
                                username: "john"
                            });
                            done();
                        });
                });
            });
            describe('when book name is wrong', function(done) {
                it('should return a 404 and a message for invalid book name', function (done) {
                    chai.request(server)
                        .get('/comments/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Comment NOT Found!');
                            done();
                        });
                });
            });
        });
        describe('GET /comments/search/:bookname',  () => {
            describe('when fuzzy search book name is correct', function(done) {
                it('should return one or more comments you fuzzy search for', function (done) {
                    chai.request(server)
                        .get('/comments/search/build')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(1);
                            let result = _.map(res.body, (comment) => {
                                return {
                                    text: comment.text,
                                    username: comment.username,
                                    bookname: comment.bookname,
                                }
                            });
                            expect(result).to.include({
                                text: "it is very useful",
                                bookname: "Building Web Sites All-in-One Desk Reference For Dummies",
                                username: "john"
                            });

                            done();
                        });
                });
            });
            describe('when fuzzy search book name is wrong', function(done) {
                it('should return a 404 and a message for invalid keyword', function (done) {
                    chai.request(server)
                        .get('/comments/search/abc')
                        .end(function (err, res) {
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message', 'Comment NOT Found!');
                            done();
                        });
                });
            });
        });
    });
})