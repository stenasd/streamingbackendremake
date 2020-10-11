const supertest = require('supertest');
const serverImport = require('../src/server');
const models = require('../db/models');
const userModel = models.userModel;
const server = supertest.agent(serverImport.app);
describe('GET /api/checkAuthentication', function () {
    it('login', loginUser());
    it('login checkAuthentication', function (done) {
        server
            .get('/api/checkAuthentication')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });
    });
    it('logout', logoutUser());
    it('check logout checkAuthentication', function (done) {
        server
            .get('/api/checkAuthentication')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });
    });

});
describe('/api/uservideodata', async function () {
    // to make moviedata cell null 
    userModel.update({ moviedata: null }, {
        where: {
            id: 1
        }
    })
    let inserts = ["2","1"]
    it('login', loginUser());
    it('post', sendpost(inserts[0]));
    it('post2', sendpost(inserts[1]));
    it('get uservideodata logged in', function (done) {
        server
            .get('/api/uservideodata')
            .expect(200)
            .end(function (err, res) {
                //jsonarray is reversed this checks for input to output
                if(res.body.movarr[1].id!=inserts[0]){
                    return done("not matching post/get")
                }
                if(res.body.movarr[0].id!=inserts[1]){
                    return done("not matching post/get")
                }
                if (err) return done(err);
                done()
            });
    });

});

function loginUser() {
    return function (done) {
        server
            .post('/api/login')
            .send({ username: '123', password: '123' })
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
};
function logoutUser() {
    return function (done) {
        server
            .get('/api/logout')
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
};
function sendpost(idparram) {
    return function (done) {
        server
            .post('/api/uservideodata')
            .send({ id: idparram, time: idparram })
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });
    };
};