var mongoose = require('mongoose');
var PageModel = mongoose.model('PageModel');

var dataDisplaysRenderers = {};

/**
 * Service to register a component with a function to deliver its data to display.
 */
module.exports.registerDisplayRenderer = function(componentType, functionToRegister) {
  dataDisplaysRenderers[componentType] = functionToRegister;
}

/**
 * Service to fetch the data display function for a component.
 */
module.exports.fetchDisplayRenderer = function(componentType) {
  return dataDisplaysRenderers[componentType];
}

/**
 * Service to build data of the complete HTML page, to be used by other components.
 */
module.exports.extractDataFromPageModel = function(componentTemplate, componentData, fn) {
  // Let's start by searching the correct page model.
  pageModelId = componentData.metadataDisplay.pageModelId;
  pageModel = PageModel.findOne({"_id": pageModelId}, function(err, pageModel) {
    // Handle errors or empty response.
    if (! pageModel) {
      fn({});
      return;
    } else if (err) {
      fn(null, err);
      return;
    }

    // The final callbacl function, called after recurring through all elements.
    var functionFinalCallback = function() {
      // We can add the placeHolder 'main' with the data received from the component.
      //if (! pageModel.placeHolders) { pageModel.placeHolders = [] }
      if (! pageModel.placeHolders.main) { pageModel.placeHolders.main = [] }
      placeHolderMain = {
        template: componentTemplate,
        data: componentData };
      pageModel.placeHolders.main.push(placeHolderMain);

      // Let's render the page.
      fn(pageModel);
    }

    // We first compute the number of iterations to handle properly all callbacks.
    totalNbOfIterations = 0;
    for (var placeHolderKey in pageModel.placeHolders) {
      var elementsAtPlaceHolder = pageModel.placeHolders[placeHolderKey];
      totalNbOfIterations += elementsAtPlaceHolder.length;
    }

    // Let's go through the page model elements to extract their data from the database.
    if (! pageModel.placeHolders) { pageModel.placeHolders = {} }
    nbIterations = 0;
    for (var placeHolderKey in pageModel.placeHolders) {
      var elementsAtPlaceHolder = pageModel.placeHolders[placeHolderKey];
      elementsAtPlaceHolder.forEach(function(element) {
        // We can use the display renderer for the current component.
        serviceForComponent = dataDisplaysRenderers[element.componentType];
        serviceForComponent({id: element.elementId}, function(dataForComponent) {
          element['data'] = dataForComponent;
          element['template'] = element.componentType + '/' + element.templateFlavour;

          // Because we are using callbacks, we need to be sure that all methods are finished before calling
          // back the last function.
          nbIterations++;
          if (nbIterations === totalNbOfIterations) {
            functionFinalCallback();
          }
        });
      });
    };

    // In case we are not iterating through the loop because no component elsewhere than 'main',
    // we have to render.
    if (totalNbOfIterations == 0) {
      functionFinalCallback();
    }
  }).lean();
};
