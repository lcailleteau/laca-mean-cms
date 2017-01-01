var genericCrudService = require('../../backend/services/generic/generic-crud-service');
var authenticationService = require('../../backend/services/authentication/authentication-service');

/**
 * Generic JSON response sender
 */
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * The security check method.
 */
var securityCheck = function(expectedRoles, specificFunction) {
  return function(req, res) {
    // Let's make the security testing.
    if (expectedRoles) {
      // Check header, or url parameters or post parameters for JWT token.
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      authenticationService.checkAuthentAndRoles(token, expectedRoles, req.params.site, function(authentAndRolesResult) {
        // Let's check if we have a correct security response.
        if (! authentAndRolesResult.success) {
          sendJSONresponse(res, authentAndRolesResult.code, authentAndRolesResult.message);
        } else {
          // All is clear on security point of view, we can delegate the call to the
          // specific service.
          specificFunction(req, res);
        }
      });
    } else {
      // No security check.
      specificFunction(req, res);
    }
  };
}

/**
 * Method : GET
 * On : /[elements]
 */
module.exports.list = function(MongooseModel, expectedRoles, queryFunction, projection) {
  return securityCheck(expectedRoles, function(req, res) {
    // Extract the query.
    query = {};
    if (queryFunction) { query = queryFunction(req.params) }
    genericCrudService.list(MongooseModel, function(elementsList, err) {
      if (err) {
        sendJSONresponse(res, 400, err);
        /*
      } else if (!elementsList || elementsList.length == 0) {
        sendJSONresponse(res, 404, "{message: 'empty list'}");
        */
      } else {
        sendJSONresponse(res, 200, elementsList);
      }
    }, query, projection);
  });
};

/**
 * Method : POST
 * On : /[elements]
 */
module.exports.create = function(MongooseModel, expectedRoles, specificControllerCallbackAfter) {
  return securityCheck(expectedRoles, function(req, res) {
    elementDetail = req.body;
    genericCrudService.create(MongooseModel, elementDetail, function(element, err) {
      if (err) {
        // In case of an error after creation.
        sendJSONresponse(res, 400, err);
      } else {
        // Prepare the response function.
        var sendJsonResponseOk = function(req, res, element) {
          sendJSONresponse(res, 200, element);
        }

        // If callback function.
        if (specificControllerCallbackAfter) {
          specificControllerCallbackAfter(req, res, element, sendJsonResponseOk);
        } else {
          sendJsonResponseOk(req, res, element);
        }
      }
    });
  });
};

/**
 * Method : DELETE
 * On : /[elements]/:[elementid]
 */
module.exports.delete = function(MongooseModel, expectedRoles) {
  return securityCheck(expectedRoles, function(req, res) {
    elementId = req.params.id;
    genericCrudService.delete(MongooseModel, elementId, function(element, err) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else if (!element) {
        sendJSONresponse(res, 404, "{message: 'unknown element id " + elementId + "'}");
      } else {
        sendJSONresponse(res, 204, "");
      }
    });
  });
};

/**
 * Method : PUT
 * On : /[elements]/:[elementid]
 */
module.exports.update = function(MongooseModel, expectedRoles, specificControllerCallbackBefore, specificControllerCallbackAfter) {
  return securityCheck(expectedRoles, function(req, res) {
    // Build the method.
    var realUpdateClosure = function(req, res) {
      elementId = req.params.id;
      elementDetail = req.body;
      genericCrudService.update(MongooseModel, elementId, elementDetail, function(element, err) {
        if (err) {
          sendJSONresponse(res, 400, err);
        } else if (!element) {
          sendJSONresponse(res, 404, "{message: 'unknown element id " + elementId + "'}");
        } else {
          // Prepare the response function.
          var sendJsonResponseOk = function(req, res, element) {
            sendJSONresponse(res, 200, element);
          }

          // If callback function.
          if (specificControllerCallbackAfter) {
            specificControllerCallbackAfter(req, res, element, sendJsonResponseOk);
          } else {
            sendJsonResponseOk(req, res, element);
          }
        }
      });
    }

    // If callback function.
    if (specificControllerCallbackBefore) {
      elementId = req.params.id;
      specificControllerCallbackBefore(req, res, elementId, realUpdateClosure);
    } else {
      realUpdateClosure(req, res);
    }
  });
};

/**
 * This method aims at updating a parent element after a child creation or
 * modification.
 */
var updateParentElementFunction = function(req, res, element, elementParentAttribute,
    parentMongooseModel, parentChildrenArrayAttribute, actionType, nextCallback) {
  // We need to update the possible parent element.
  if (element[elementParentAttribute]) {
    // Let's find out the parent element.
    var mongoRequest = { _id: element.get(elementParentAttribute) };
    genericCrudService.list(parentMongooseModel, function(parentElementsList, err) {
      if (parentElementsList && parentElementsList.length > 0) {
        var parentElement = parentElementsList[0];
        var parentChildrenArray = parentElement[parentChildrenArrayAttribute];
        if (! parentChildrenArray) {
          parentChildrenArray = [];
        }
        var eltAlreadyInArray = false;
        for (i = 0; i < parentChildrenArray.length; i++) {
          if (JSON.stringify(parentChildrenArray[i]) === JSON.stringify(element._id)) {
            eltAlreadyInArray = true;
          }
        };

        // We now have the children array on which we must operate. Let's distinguish between
        // an add or a remove operation.
        if (actionType == 'add') {
          if (! eltAlreadyInArray) {
            parentChildrenArray.push(element._id);
          }
        } else {
          if (eltAlreadyInArray) {
            var index = parentChildrenArray.indexOf(element._id, 0);
            if (index > -1) { parentChildrenArray.splice(index, 1); }
          }
        }

        // Let's update the parent element with this new children array.
        var parentElementModification = {};
        parentElementModification[parentChildrenArrayAttribute] = parentChildrenArray;
        genericCrudService.update(parentMongooseModel, parentElement._id, parentElementModification, function(parentElementModified, err) {
          // Modification is fine on the parent category.
          nextCallback(req, res, element);
        });
      } else {
        // Send the created category as response, the parent category has not been found.
        nextCallback(req, res, element);
      }
    }, mongoRequest);
  } else {
    // Send the created category as response, no parent category.
    nextCallback(req, res, element);
  }
}

/**
 * Exports the function.
 */
module.exports.updateParentElement = updateParentElementFunction;

/**
 * Update parent element from an element id, and not a full element.
 * We first need to retrieve the element from database before proceed.
 */
module.exports.updateParentElementFromId = function(req, res, elementId, mongooseModel, elementParentAttribute,
     parentMongooseModel, parentChildrenArrayAttribute, actionType, nextCallback) {
  // We have to find the element first.
  var mongoRequest = { _id: elementId };
  genericCrudService.list(mongooseModel, function(elementsList, err) {
    if (elementsList && elementsList.length > 0) {
      var element = elementsList[0];

      // Now we have our full element, we can update its parent.
      updateParentElementFunction(req, res, element, elementParentAttribute,
          parentMongooseModel, parentChildrenArrayAttribute, actionType, nextCallback);
    }
  }, mongoRequest);
}
