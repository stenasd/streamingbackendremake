var passport = require('passport');
const colors = require('colors');
var Strategy = require('passport-local').Strategy;
const controller = require('./controller');
const { json } = require('body-parser');
passport.use(new Strategy(
    function (username, password, cb) {
        controller.findByUsername(username, function (err, user) {

            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.pass != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function (user, cb) {

    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    controller.findById(id, function (err, user) {

        if (err) { return cb(err); }
        cb(null, user);
    });
});
exports.route = async function route(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.post('/api/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });
    app.get("/api/checkAuthentication", (req, res) => {
        if (typeof req.user !== 'undefined') {

            res.status(200).json({
                authenticated: true,
            });
        }
        else {
            res.status(400).json({
                authenticated: false,
            });
        }

    });
    app.get('/api/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });
    app.post("/api/uservideodata", async (req, res) => {
        let string = "get request" + JSON.stringify(req.body)

        //check if id and time and duration is a number then unshift to front and remove dupplicates and remove stuff thats over 10 movies
        //await old movie list
        if (typeof req.user !== 'undefined') {
            let user = await controller.getUserFromId(req.user.id)

            if (user.moviedata != null) {
                let usermoviearray = replaceAllBackSlash(user.moviedata)
                usermoviearray = JSON.parse(usermoviearray)

                controller.UpdateMovieData(user.id, controller.jsonpostformater(req.body, usermoviearray))
            }
            else {

                var idcheck = parseInt(req.body.id)
                var timecheck = parseInt(req.body.time)

                if (idcheck) {
                    if (timecheck) {

                        let sendjson = { "movarr": [{ "id": req.body.id, "time": req.body.time }] }

                        controller.UpdateMovieData(user.id, { "movarr": [{ "id": req.body.id, "time": req.body.time }] })
                    }
                }


            }
            res.status(200).json(req.body.time);
        }
    });
    app.get("/api/uservideodata", async (req, res) => {
        let string = "get request" + req.user.moviedata

        if (typeof req.user !== 'undefined') {
            let user = await controller.getUserFromId(req.user.id)

            if (user.moviedata) {
                //for each GetFromWhere
                let usermovie = replaceAllBackSlash(user.moviedata)

                usermovie = JSON.parse(usermovie)
                let completearr = { "movarr": [] }
                let unresolvedpromises = usermovie.movarr.map(async function (x) {
                    //add to json with image and name and stuff
                    let mov = await controller.getMovieFromId(x.id)
                    let obj = {"time": x.time, "id": x.id }

                    return obj
                })
                completearr.movarr = await Promise.all(unresolvedpromises)


                
                res.status(200).json(await completearr);
            }
        }
    });
};
function replaceAllBackSlash(targetStr) {
    var index = targetStr.indexOf("\\");
    while (index >= 0) {
        targetStr = targetStr.replace("\\", "");
        index = targetStr.indexOf("\\");
    }
    return targetStr;
}