var mongoose = require('mongoose');

var WikiCategory = mongoose.model('WikiCategory');
var WikiArticle = mongoose.model('WikiArticle');

/**
 * Service to build data of the complete HTML page.
 */
module.exports.extractDataDisplayCategory = function(parameters, fn) {
  categorySlug = parameters.slug;

  // Let's start by searching the correct WikiCategory.
  WikiCategory.findOne({"slug": categorySlug}, function(err, wikiCategory) {
    // Handle errors or empty response.
    if (! wikiCategory) {
      fn([]);
      return;
    } else if (err) {
      fn(null, err);
      return;
    }

    // We have our category, so let's now find the articles.
    WikiArticle.find({
      '_id': { $in: wikiCategory.articlesIds }
    }, function(err, wikiArticles) {
      if (err) {
        console.log(err);
        res.send("ERROR : " + err);
      }

      // We can register the articles, but they need to be in the same order as specified in the model.
      wikiCategory.articles = wikiCategory.articlesIds.map(function(item) {
        return wikiArticles.find(function(item2) {
          return item2._id.equals(item);
        });
      });

      // Execute the function given as parameter.
      fn(wikiCategory);
    });
  }).lean();
}
