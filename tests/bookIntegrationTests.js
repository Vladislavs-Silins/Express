require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);
describe('Book Crood tests', () => {
  it('should allow a book to be posted and returns _id and read', (done) => {
    const bookPost = { title: 'Boo Book', author: 'Ghost', genre: 'Horror' };
    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });
  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
