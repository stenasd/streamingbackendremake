
const supertest = require('supertest');
const server = require('../src/server');
const app = server.app
describe("get('/api/videodata')", function () {
    it("it should has status code 200", function (done) {
        supertest(app)
            .get('/api/videodata')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });
});
