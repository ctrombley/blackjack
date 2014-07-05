var should  = require('should'),
    request = require('supertest'),
    app     = require('../app');

describe('Routing', function() {
  describe('Deck', function() {
    it('should return 200 ok when requesting a deal', function(done) {
      request(app)
        .post('/deal')
        .send({bet: 100})
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });

      done();
    });

    it('should return 200 ok when requesting a hit', function(done) {
      request(app)
        .post('/hit')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });

      done();
    });

    it('should return 200 ok when requesting a stand', function(done) {
      request(app)
        .post('/stand')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });

      done();
    });
  });
});
