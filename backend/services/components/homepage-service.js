var mongoose = require('mongoose');

var HtmlFragment = mongoose.model('HtmlFragment');
var Homepage = mongoose.model('Homepage');

/**
 * Service to build data of the complete HTML page to render an homepage.
 */
module.exports.extractDataDisplay = function(parameters, fn) {
  site = parameters.site;

  // Let's start by searching the correct homepage.
  Homepage.findOne({"siteSlug": site, "defaultHomepage": true}, function(err, homepage) {
    // Handle errors or empty response.
    if (! homepage) {
      fn([]);
      return;
    } else if (err) {
      fn(null, err);
      return;
    }

    // We have our homepage, so let's build the data for the 'main' placeholder.
    HtmlFragment.find({
      '_id': { $in: homepage.htmlFragmentsIds }
    }, function(err, htmlFragments) {
      if (err) {
        console.log(err);
        res.send("ERROR : " + err);
      }

      // We can register the HTML fragments, but they need to be in the same order as specified in the homepage.
      homepage.htmlFragments = homepage.htmlFragmentsIds.map(function(item) {
        return htmlFragments.find(function(item2) {
          return item2._id.equals(item);
        });
      });

      // Execute the function given as parameter.
      fn(homepage);
    });
  }).lean();
}
