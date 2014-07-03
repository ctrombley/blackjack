var should  = require('should');
var request = require('supertest');
var app     = require('../app');

describe('Routing', function() {
  describe('Deck', function() {
    it('should return 200 ok when requesting a deal', function(done) {
      request(app)
        .get('/deal')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          status: 'ok'
        })
        .end(function(err, res) {
          if (err) throw err;
        });

      done();
    });
  });
});
