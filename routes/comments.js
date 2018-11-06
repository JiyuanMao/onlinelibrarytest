let comments = require('../models/comments');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Comment = require('../models/comments');


var mongodbUri ='mongodb://jiyuan:qwert12345@ds151523.mlab.com:51523/onlinelibrary';

mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Comment.find({ "bookname" : req.params.bookname },function(err, comment) {
        if (comment.length <=0) {
            res.status(404);
            res.json({message: 'Comment NOT Found!'});
        }else
            res.send(JSON.stringify(comment,null,5));
    });
}

router.addComment = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var comment = new Comment();

    comment.text = req.body.text;
    comment.username = req.body.username;
    comment.bookname = req.body.bookname;

    comment.save(function(err) {
        if (err)
            res.json({ message: 'Comment NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Comment Successfully Added!', data: comment });
    });
}

router.deleteComment = (req, res) => {

    Comment.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(404);  //new
            res.json({message: 'Comment NOT DELETED!', errmsg: err});
        }else{
            res.json({ message: 'Comment Successfully Deleted!'});
        }
    });
}

router.editComment = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    /*var updatestr = {
        "text": req.body.text,
        "username": req.body.username,
        "bookname": req.body.bookname,
    }*/
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            res.status(404);
            res.json({message: 'Comment NOT Found!'});
        }else {
            comment.text = req.body.text;
            comment.username = req.body.username;
            comment.bookname = req.body.bookname;
            comment.save(function(){
                if(err)
                    res.json({message: 'Comment NOT UpDated!',errmsg:err});
                else
                    res.json({message: 'Comment Successfully UpDated!',data:comment});
            });
        }
    });

}

router.searchByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'bookname': {$regex:req.params.bookname,$options:'i'}};
    Comment.find(keyword, function (err, comment) {
        if (comment.length <= 0) {
            res.status(404);
            res.json({message: 'Comment NOT Found!'});
        }else {

            res.send(JSON.stringify(comment,null,5));
        }
    });
}

module.exports = router;