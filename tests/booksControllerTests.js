require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Book controller tests', () => {
  describe('Post', () => {
    it('Should not allow an empty string in a post title', () => {
      const Book = function (book) {
        this.save = () => { };
      };
      const req = {
        body: {
          author: 'JRRPushkien'
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
