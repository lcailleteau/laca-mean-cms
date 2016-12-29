var displayRendererService  = require('../../backend/services/generic/display-renderer-service');

/**
 * Gets the homepage for the given site.
 */
module.exports.display = function(componentType, componentTemplate) {
  return function(req, res) {
    // Let's find the service associated to the component type, and call it.
    serviceForComponent = displayRendererService.fetchDisplayRenderer(componentType);
    serviceForComponent(req.params, function(componentData) {
      // With the metadataDisplay, we have the reference to the page model linked with our element.
      // First of all, we need to compute all the data display for the components registered
      // at different place holders of the template.
      displayRendererService.extractDataFromPageModel(componentTemplate, componentData, function(pageModel) {
        // We can build the JSON full data for the page to render, and extract
        // the correct template as well.
        var template = 'templates/' + pageModel.template + '/' + pageModel.templatePage;
        res.render(template, pageModel);
      });
    });
  };
};
