const User = require('../models/User');
const passport = require('passport');

module.exports = function(app) {
// will need to set up passport and create a login in route, but first I want to create an add  user route
    app.post('/api/users', (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass username and password.'});
          } else {
            const newUser = new User({
              email: req.body.email,
              password: req.body.password,
              nickname: req.body.nickname
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
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