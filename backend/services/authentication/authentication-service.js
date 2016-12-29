var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

var User = mongoose.model('User');

// Secret used for the JWT signature. It has to be removed from here and put in a secret file,
// or change auth mode to use public / private keys.
var secretPass = 'secretPassPhrase_hasToBeChanged';

/**
 * Authentication service. It gives a JWT token if correct user / password is given.
 * Helper from https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens.
 */
module.exports.authenticate = function(login, password, fn) {
  // Let's find the user.
  User.findOne({
    login: login
  }, function(err, user) {
    // In case of an error.
    if (err) {
      fn(null, err)
    } else {
      console.log(user);

      // In case of the user does not exist.
      if (!user) {
        fn({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // Let's check the password.
        if (user.password != password) {
          fn({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // The user exists, and the password is correct.
          // Let's create a JWT token.
          // We don't want to send the password of course, so we extract useful data from the
          // mongoDb element.
          var userToSend = {
            login: user.login,
            email: user.email,
            roles: user.roles
          }
          var token = jwt.sign(userToSend, secretPass, {
            expiresIn: 24*60*60 // Expires in 24 hours.
            //expiresIn: 2*60 // Expires in 2 minutes.
          });

          // Returns the information including token as JSON.
          fn({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            login: user.login,
            email: user.email,
            roles: user.roles
          });
        }
      }
    }
  });
}

/**
 * Roles and authent check service. The given token is validated againt the secret,
 * and roles are parsed to check user credentials.
 */
module.exports.checkAuthentAndRoles = function(token, expectedRoles, site, fn) {
  if (! token) {
    fn({
      success: false,
      code: 403,
      message: 'No Token provided'
    })
  } else {
    // Let's verify the token according to the secret.
    jwt.verify(token, secretPass, function(err, decodedToken) {
      if (err) {
        fn({
          success: false,
          code: 401,
          message: 'Failed to authenticate token.'
        });
      } else {
        // We managed to authenticate the user, because the token has really been signed with the secret.
        // We now need to check the roles.
        var roleOk = false;
        for (var i=0; i<decodedToken.roles.length; i++) {
          currentRole = decodedToken.roles[i];

          // First of all, let's make the link on the site slug element.
          if (currentRole.siteSlug == null ||
              currentRole.siteSlug == '' ||
              currentRole.siteSlug == site) {
            // Ok for the site slug, let's focus on the role itself, we need to check that
            // at least one role required is checked.
            for (var j=0; j<expectedRoles.length; j++) {
              if (currentRole.type == 'superadmin' ||
                  currentRole.type == expectedRoles[j].type) {
                roleOk = true;
              }
            }
          }
        }

        // Let's render the response.
        var code = 200;
        var message = "Authentication and roles are fine";
        if (!roleOk) {
          code = 403;
          message = "The user is not allowed to proceed on this request";
        }
        fn({
          success: roleOk,
          code: code,
          message: message
        });
      }
    });
  }
}
