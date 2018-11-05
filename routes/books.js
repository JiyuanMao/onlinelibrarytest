let books = require('../models/books');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Book = require('../models/books');


var mongodbUri ='mongodb://jiyuan:qwert12345@ds151523.mlab.com:51523/onlinelibrary';

mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(books,null,5));
        //console.log(books.sort());
    });
}



router.findByName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "name" : req.params.name },function(err, book) {
        if (book.length <=0) {
            // return a suitable error message
            res.status(404);
            res.json({message: 'Book NOT Found!'});
        }else
        // return the book
            res.send(JSON.stringify(book,null,5));
    });

}

router.addBook = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = new Book();

    book.name = req.body.name;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.category = req.body.category;

    book.save(function(err) {
        if (err)
            res.json({ message: 'Book NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Added!', data: book });
    });
}

router.incrementLikes = (req, res) => {

    Book.find(req.params.name, function(err,book) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'Liked Not Successfully!', errmsg: err})
        }else {
            book.likes += 1;
            book.save(function (err) {
                if (err) {
                    res.json({message: 'Book NOT Successfully Liked!', errmsg: err})
                }else {
                    res.json({message: 'Book Successfully Liked!', data: book});
                }
            });
        }
    });
}

router.deleteBook = (req, res) => {

    Book.remove(req.params.name, function(err) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'Book NOT DELETED!', errmsg: err});
        }else{
            res.json({ message: 'Book Successfully Deleted!'});
        }
    });
}

router.findByAuthor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "author" : req.params.author },function(err, book) {
        if (book.length <=0) {
            // return a suitable error message
            res.status(404);
            res.json({message: 'Author NOT Found!'})
        }else{
            // return the book
            res.send(JSON.stringify(book,null,5));
        }
    });

}



router.findByPublisher = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "publisher" : req.params.publisher },function(err, book) {
        if (book.length <=0) {
            // return a suitable error message
            res.status(404);
            res.json({message: 'Publisher NOT Found!'});
        }else
        // return the book
            res.send(JSON.stringify(book,null,5));
    });

}

router.findByCategory = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Book.find({ "category" : req.params.category },function(err, book) {
        if (book.length <=0) {
            // return a suitable error message
            res.status(404);
            res.json({message: 'Category NOT Found!'});
        }else
        // return the book
            res.send(JSON.stringify(book,null,5));
    });

}

router.editBook = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    /*var updatestr = {
        "name": req.body.name,
        "author": req.body.author,
        "publisher": req.body.publisher,
        "category": req.body.category,
        "likes": req.body.likes
    }*/
    Book.find(req.params.id, function (err, book) {
        if (err) {
            res.status(404);
            res.json({message: 'Invalid book id,update not successfully!'});
        }else {
            book.name = req.body.name;
            book.author = req.body.author;
            book.publisher = req.body.publisher;
            book.category = req.body.category;
            book.likes= req.body.likes;
            book.save(function(){
                if(err)
                    res.json({message: 'Book NOT UpDated!',errmsg:err});
                else
                    res.json({message: 'Book Successfully UpDated!',data:book});
            });
        }
    });

}

router.searchByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'name': {$regex:req.params.name,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (book.length <= 0){
            res.status(404);
            res.json({message: 'Book NOT Found!'})
        }else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByAuthor = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'author': {$regex:req.params.author,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (book.length <= 0) {
            res.status(404);
            res.json({message: 'Author NOT Found!'});
        }else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByPublisher = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'publisher': {$regex:req.params.publisher,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (book.length <= 0) {
            res.status(404);
            res.json({message: 'Publisher NOT Found!'});
        }else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}

router.searchByCategory = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'category': {$regex:req.params.category,$options:'i'}};
    Book.find(keyword, function (err, book) {
        if (book.length <= 0) {
            res.status(404);
            res.json({message: 'Category NOT Found!'});
        }else {

            res.send(JSON.stringify(book,null,5));
        }
    });
}
module.exports = router;