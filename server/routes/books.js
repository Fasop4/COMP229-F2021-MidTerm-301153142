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
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: "",
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  // show the details page to add a new book
    res.render("details", {
      title: "Add book",
      books: ""
    })
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = new book({
    title: req.body.Title,
    description: body.Description,
    price: req.body.Price,
    author: req.body.Author,
    genre: req.body.Genre
  });
  
  books.create(newBook, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books")
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let bookId = req.params.id;

    books.findById(bookId, {}, {}, (err, bookToEdit) => {
      if (err) {
        console.error(err);
        res.end(err);
      }

      res.render("details", {
        title: "Edit Book",
        books: bookToEdit,
      });
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    let bookId = req.params.id;

    console.log(bookId);
    console.log(req.body);

    let updatedBook = new book({
      _id: bookId,
      title: req.body.Title,
      description: body.Description,
      price: req.body.Price,
      author: req.body.Author,
      genre: req.body.Genre
    });

    book.updateOne({_id : bookId}, updatedBook, {}, (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      }

      res.redirect("/books")
    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
