const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');
const settings = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
  // will need to set up passport and create a login in route, but first I want to create an add  user route
  app.post('/api/users', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
        difficulty: req.body.difficulty,
        pitch: req.body.pitch
      });
      // save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({ success: false, msg: 'Username already exists.' });
        }
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  });

  app.post('/login', function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
      } else {
        // check if password is correct
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if email and password match
            const token = jwt.sign(user.toJSON(), settings.secret);
            // return info including token as JSON
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        });
      }
    });
  });

  //authorization protected user route
  app.get('/api/user/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    const token = getToken(req.headers);
    if (token) {
      User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) return next(err);
        else if (jwt.sign(user.toJSON(), settings.secret) === token) { //otherwise, check that the user and token match
          res.json(user);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  });

  //for testing only
  app.get('/api/users', (req, res) => {
    User.find({}).then(
      results => {
        res.json(results)
      }).catch(err => {
        res.json(err);
      })
  });
}