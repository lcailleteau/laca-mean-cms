var authenticationService = require('../../backend/services/authentication/authentication-service');

/**
 * Generic JSON response sender
 */
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * Method : authenticate.
 */
module.exports.authenticate = function(req, res) {
  // Let's call the authentication service.
  authenticationService.authenticate(req.body.login, req.body.password, function(result, err) {
    if (err) {
      sendJSONresponse(res, 400, err);
    } else if (!result || result.length == 0) {
      sendJSONresponse(res, 400, "{message: 'empty authentication result'}");
    } else if (!result.success) {
      sendJSONresponse(res, 401, result);
    } else {
      sendJSONresponse(res, 200, result);
    }
  });
};
