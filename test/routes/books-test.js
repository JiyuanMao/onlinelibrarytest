let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let Book=require('../../models/books');

chai.use(chaiHttp);
let _ = require('lodash' );
chai.use(require('chai-things'));

describe('Books', function (){
    // TODO
    describe('Get/', function (){
        beforeEach (function (done){
            var newBook = new Book({
                name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                author: 'Doug Sahlin',
                publisher:'John Wiley & Sons',
                category:'Computing Science',
                likes:0
            });
            newBook.save(function(err){
                done();
            });
        });
        describe('GET /books',  () => {
            it('should return all the books in an array', function(done) {
                chai.request(server)
                    .get('/books')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science',
                        } );

                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/bname/:name',  () => {
            it('should return one book by name you search for', function(done) {
                chai.request(server)
                    .get('/books/bname/Building Web Sites All-in-One Desk Reference For Dummies')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science'
                        } );

                        done();
                    });
            });
            it('should return a 404 and a message for wrong book name', function(done) {
                chai.request(server)
                    .get('/books/bname/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Book NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/bpublisher/:publisher',  () => {
            it('should return books according to publisher you search for', function(done) {
                chai.request(server)
                    .get('/books/bpublisher/John Wiley & Sons')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science'
                        } );
                        done();
                    });
            });
            it('should return a 404 and a message for invalid book publisher', function(done) {
                chai.request(server)
                    .get('/books/bpublisher/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Publisher NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/bcategory/:category',  () => {
            it('should return books according to category you search for', function(done) {
                chai.request(server)
                    .get('/books/bcategory/Computing Science')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science'
                        } );
                        done();
                    });
            });
            it('should return a 404 and a message for invalid book category', function(done) {
                chai.request(server)
                    .get('/books/bcategory/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Category NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/bauthor/:author',  () => {
            it('should return books according to author you search for', function(done) {
                chai.request(server)
                    .get('/books/bauthor/Doug Sahlin')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science'
                        } );
                        done();
                    });
            });
            it('should return a 404 and a message for invalid book author', function(done) {
                chai.request(server)
                    .get('/books/bauthor/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Author NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/searchname/:name',  () => {
            it('should return one or more books you fuzzy search for', function(done) {
                chai.request(server)
                    .get('/books/searchname/Dummies')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science',
                        } );
                        done();
                    });
            });
            it('should return a 404 and a message for invalid keyword', function(done) {
                chai.request(server)
                    .get('/books/searchname/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Book NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/searchauthor/:author',  () => {
            it('should return one or more books by author you fuzzy search for', function(done) {
                chai.request(server)
                    .get('/books/searchauthor/Doug')
                    .end(function(err, res) {
                        //expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science',
                        } );

                        done();
                    });
            });
            it('should return a 404 and a message for invalid keyword', function(done) {
                chai.request(server)
                    .get('/books/searchauthor/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Author NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });

        describe('GET /books/searchpublisher/:publisher',  () => {
            it('should return one or more books by publisher you fuzzy search for', function(done) {
                chai.request(server)
                    .get('/books/searchpublisher/john')
                    .end(function(err, res) {
                       // expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author:book.author,
                                publisher:book.publisher,
                                category:book.category,
                            }
                        });
                        expect(result).to.include( { name: 'Building Web Sites All-in-One Desk Reference For Dummies',
                            author: 'Doug Sahlin',
                            publisher:'John Wiley & Sons',
                            category:'Computing Science'
                        } );

                        done();
                    });
            });
            it('should return a 404 and a message for invalid publisher keyword', function(done) {
                chai.request(server)
                    .get('/books/searchpublisher/abc')
                    .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Publisher NOT Found!' ) ;
                        done();
                    });
            });
            after(function(done) {
                Book.collection.drop();
                done();
            });
        });




    });

});