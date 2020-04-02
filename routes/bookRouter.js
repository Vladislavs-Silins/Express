/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controllers/booksController.js');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book, body } = req;
      book.title = body.title;
      book.author = body.author;
      book.genre = body.genre;
      book.read = body.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book, body } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete body._id;
      }
      Object.entries(body).forEach((item) => {
        const [key, value] = item;
        book[key] = value;
      });
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      book.delete((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
