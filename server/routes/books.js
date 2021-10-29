// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  books.find((err, book) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        favourite_books: "",
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  // show the details page to add a new book
  res.render("books/details", {
    title: "Add book",
    favourite_books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  console.log(req.body);

  book.create(newBook, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      // refresh index book list page
      res.redirect("/books/index")
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let bookId = req.params.id;

  book.findById(bookId, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.render("/books/details", {
        title: "Edit Book",
        favourite_books: books
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let bookId = req.params.id;

  console.log(bookId);
  console.log(req.body);

  let updatedBook = book({
    "_id": bookId,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  book.updateOne({
    _id: bookId
  }, updatedBook, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {

      res.redirect("books/index")
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let bookId = req.params.id;

  book.remove({
    _id: bookId
  }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {

      res.redirect("books/index")
    }
  });
});


module.exports = router;