const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

exports.initRestMiddleware = function initRestMiddleware(app) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  //in production set secure true in session
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};