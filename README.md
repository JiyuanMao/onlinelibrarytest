# Assignment 1 - API testing and Source Control.

Name: Jiyuan Mao 20082259

## Overview.

      My website is an online library website.Online library has three models:books,comments,users.
      Books have its own name,author,publisher,category and upvotes.Comments means the comment for
      book.One book can have many comments from different users but one comment must correspond to
      one user.

## API endpoints.
 models:books
 + GET /books - Get all books.
 + GET /books/bname/:name - Get books on a particular name.
 + GET /books/bpublisher/:publisher - Get books on a particular publisher.
 + GET /books/bcategory/:category - Get books on a particular category.
 + GET /books/bauthor/:author - Get books on a particular author..
 + GET /books/searchname/:name - Get books by fuzzy search name.
 + GET /books/searchauthor/:author - Get books by fuzzy search author.
 + GET /books/searchpublisher/:publisher - Get books by fuzzy search publisher.
 + GET /books/searchcategory/:category - Get books by fuzzy search category.
 + POST /books - Add books.
 + PUT /books/:id - Update specific book's information.
 + PUT /books/:id/like - Add one like of a specific book.
 + DELETE /books/:id - Delete specific book.

models:comments
+ GET /comments/:bookname - Get comments on a particular bookname.
+ GET /comments/search/:bookname - Get comments by fuzzy search bookname.
+ POST /comments - Add comments.
+ PUT /comments/:id - Update specific comment's information.
+ DELETE /comments/:id - Delete specific comment.

models:users
+ GET /users - Get all users.
+ POST /users - Add users.
+ PUT /users/:id - Update specific user's information.
+ DELETE /users/:id - Delete specific user.


## Data storage.

  books:
    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        publisher: String,
        category: String,
        likes: {type: Number, default: 0}
    },
    { collection: 'booksdb' });

    {
        "_id": {
            "$oid": "5bddd16a83307418042380d3"
        },
        "likes": 0,
        "name": "Building Web Sites All-in-One Desk Reference For Dummies",
        "author": "Doug Sahlin",
        "publisher": "John Wiley & Sons",
        "category": "Computing Science",
        "__v": 0
    }

  comments:
    let CommentSchema = new mongoose.Schema({
           text: String,
           username:String,
           bookname: String,
       },
       { collection: 'commentsdb' });

    {
        "_id": {
            "$oid": "5bcc6cce83482d46acf0b4a8"
        },
        "text": "it is very useful",
        "bookname": "Foundations for Analytics with Python",
        "__v": 0,
        "username": "john"
    }

  users:
    let UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        usertype: String,
    },
    { collection: 'usersdb' });
    
    {
        "_id": {
            "$oid": "5bcc8a7585eb763974c93595"
        },
        "username": "john",
        "password": "123456",
        "__v": 0
    }

## Sample Test execution.
$ D:\WIT\OnlineLibrary>mocha test/routes/books-test.js


  > D:\WIT\OnlineLibrary
  > mocha test/routes/books-test.js

    Books
      Get/
        GET /books
          Successfully Connected to [ onlinelibrary ]
          Successfully Connected to [ onlinelibrary ]
          Successfully Connected to [ onlinelibrary ]
            √ should return all the books in an array (160ms)
        GET /books/bname/:name
          when name is correct
            √ should return one book by name you search for (47ms)
          when name is wrong
            √ should return a 404 and a message for wrong book name
        GET /books/bpublisher/:publisher
          when publisher is correct
            √ should return books according to publisher you search for (40ms)
          when publisher is wrong
            √ should return a 404 and a message for invalid book publisher
        GET /books/bcategory/:category
          when category is correct
            √ should return books according to category you search for (44ms)
          when category is wrong
            √ should return a 404 and a message for invalid book category (49ms)
        GET /books/bauthor/:author
          when author is correct
            √ should return books according to author you search for (46ms)
          when author is wrong
            √ should return a 404 and a message for invalid book author (38ms)
        GET /books/searchname/:name
          when fuzzy search name is correct
            √ should return one or more books you fuzzy search for (42ms)
          when fuzzy search name is wrong
            √ should return a 404 and a message for invalid keyword
        GET /books/searchauthor/:author
          when fuzzy search author is correct
            √ should return one or more books by author you fuzzy search for (40ms)
          when fuzzy search author is wrong
            √ should return a 404 and a message for invalid keyword
        GET /books/searchpublisher/:publisher
          when fuzzy search publisher is correct
            √ should return one or more books by publisher you fuzzy search for
          when fuzzy search publisher is wrong
            √ should return a 404 and a message for invalid publisher keyword
        GET /books/searchcategory/:category
          when fuzzy search category is correct
            √ should return one or more books by category you fuzzy search for (38ms)
          when fuzzy search category is wrong
            √ should return a 404 and a message for invalid category keyword
      Post/
        POST /books
            √ should return confirmation message and update datastore (86ms)
      Put/
        PUT /books/:id
          when id is correct
            √ should return the updated message (125ms)
          when id is wrong
            √ should return a 404 and a message for invalid book id
      Delete/
        DELETE /books/:id
          when id is correct
            √ should return delelte message and update datastore (87ms)
          when id is wrong
            √ should return a 404 and a message for invalid book id


  22 passing (3s)
$

$ D:\WIT\OnlineLibrary>mocha test/routes/comments-test.js

  > D:\WIT\OnlineLibrary
  > mocha test/routes/books-test.js


    Comments
      Get/
        GET /comments/:bookname
          when book name is correct
          Successfully Connected to [ onlinelibrary ]
          Successfully Connected to [ onlinelibrary ]
          Successfully Connected to [ onlinelibrary ]
            √ should return the comments you search for (153ms)
          when book name is wrong
            √ should return a 404 and a message for invalid book name (39ms)
        GET /comments/search/:bookname
          when fuzzy search book name is correct
            √ should return one or more comments you fuzzy search for (41ms)
          when fuzzy search book name is wrong
            √ should return a 404 and a message for invalid keyword
      Post/
        POST /comments
          √ should return confirmation message and update datastore (150ms)
      Put/
        PUT /comments/:id
          when id is correct
            √ should return the updated message (120ms)
          when id is wrong
            √ should return a 404 and a message for invalid comment id
      Delete/
        DELETE /comments/:id
          when id is correct
            √ should return delelte message and update datastore (81ms)
          when id is wrong
            √ should return a 404 and a message for invalid comment id


  9 passing (2s)
$


$ D:\WIT\OnlineLibrary>mocha test/routes/users-test.js

  > D:\WIT\OnlineLibrary
  > mocha test/routes/books-test.js


    Users
      Get/
        GET /users
        Successfully Connected to [ onlinelibrary ]
        Successfully Connected to [ onlinelibrary ]
        Successfully Connected to [ onlinelibrary ]
          √ should return all the users in an array (166ms)
      Post/
        POST /users
          √ should return confirmation message and update datastore (296ms)
      Put/
        PUT /users/:id
          when id is correct
            √ should return the updated message (190ms)
          when id is wrong
            √ should return a 404 and a message for invalid user id
      Delete/
        DELETE /users/:id
          when id is correct
            √ should return delelte message and update datastore (90ms)
          when id is wrong
            √ should return a 404 and a message for invalid user id (42ms)


    6 passing (1s)
$

## Extra features.
I created a new database and completed the test isolation.
On GET functions,I use beforeEach and afterEach,before every step,it add one record to the collection,and when test is finished,the collection will be drop.
On Post functions,I add one record to the collection,and use after hook to confirm it.
On Put functions,I edit record that I posted last step and use after hook to confirm it.
On Delete functions,I delete record that I edit last step and use after hook to confirm it.
Testing – Test code structure (nested describe blocks) √

github link:https://github.com/JiyuanMao/onlinelibrarytest.git
