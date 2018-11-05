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
    describe('Get/', function (){
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


    });

});