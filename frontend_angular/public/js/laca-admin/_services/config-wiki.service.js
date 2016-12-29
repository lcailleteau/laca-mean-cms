"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("../rxjs-operators");
var admin_main_service_1 = require("./admin-main.service");
var ConfigWikiService = (function () {
    function ConfigWikiService(http, adminMainService) {
        this.http = http;
        this.adminMainService = adminMainService;
    }
    /**
     * Service to get all wiki categories configs and articles for a given site.
     * We use the parallel http call pattern.
     * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
     * and http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
     */
    ConfigWikiService.prototype.getConfigWikiCategoriesAndArticles = function (site, forceReload) {
        var _this = this;
        if (forceReload === void 0) { forceReload = false; }
        //
        // Closure to make some order in the categories list.
        //
        var categoryChildOrderClosure = function (childConfigWikiCategory, configWikiCategoriesResult, allConfigWikiCategories, tabbed) {
            // We can push this item.
            var displayParentCategory = '';
            if (childConfigWikiCategory.parentCategory) {
                allConfigWikiCategories.forEach(function (cwc) {
                    if (cwc._id == childConfigWikiCategory.parentCategory) {
                        displayParentCategory = cwc.name;
                    }
                });
            }
            childConfigWikiCategory.display_nameWithTabs = tabbed + ' ' + childConfigWikiCategory.name;
            childConfigWikiCategory.display_parentCategory = displayParentCategory;
            configWikiCategoriesResult.push(childConfigWikiCategory);
            // Now we can treat the children.
            if (childConfigWikiCategory.childrenCategories) {
                childConfigWikiCategory.childrenCategories.forEach(function (childCategoryId) {
                    // We can add this child to the list.
                    allConfigWikiCategories.forEach(function (cwc) {
                        if (cwc._id == childCategoryId) {
                            // Let's recurse.
                            categoryChildOrderClosure(cwc, configWikiCategoriesResult, allConfigWikiCategories, tabbed + '-');
                        }
                    });
                });
            }
        };
        //
        // Category order closure.
        //
        var categoryOrderClosure = function (allConfigWikiCategories) {
            var configWikiCategoriesResult = [];
            // Let's find out categories without any parent category to start with.
            allConfigWikiCategories.forEach(function (currConfigWikiCategory) {
                if (!currConfigWikiCategory.parentCategory || currConfigWikiCategory.parentCategory == '') {
                    categoryChildOrderClosure(currConfigWikiCategory, configWikiCategoriesResult, allConfigWikiCategories, '');
                }
            });
            // Returns.
            return configWikiCategoriesResult;
        };
        //
        // Main treatment method.
        //
        if (!this.configWikiInitialized || forceReload) {
            // Body and headers.
            var headers = new http_1.Headers({ 'x-access-token': this.adminMainService.userJwtToken });
            var options = new http_1.RequestOptions({ headers: headers });
            // URLs to the web API, for categories and articles.
            var wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
            var wikiArticleConfigsUrl = '/api/' + site + '/wiki-articles';
            // Call the HTTP services in parallel.
            Observable_1.Observable.forkJoin([
                this.http.get(wikiCategoryConfigsUrl, options).map(this.extractData),
                this.http.get(wikiArticleConfigsUrl, options).map(this.extractData)
            ])
                .subscribe(function (forkJoinResult) {
                // Let's register the fetched objects, categories and articles.
                _this.configWikiCategories = forkJoinResult[0];
                _this.configWikiArticles = forkJoinResult[1];
                // Finally, let's handle specific treatment.
                _this.configWikiCategories = categoryOrderClosure(_this.configWikiCategories);
                // Let's indicate the init loading is done.
                _this.configWikiInitialized = true;
            }, function (error) {
                // Handle error.
                var errorMessage = error;
                _this.adminMainService.handleError(errorMessage, false, null);
            });
        }
    };
    /**
     * Service to get all wiki categories configs and articles for a given site.
     * We use the parallel http call pattern.
     * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
     * and http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
     */
    ConfigWikiService.prototype.getConfigWikiArticleDetail = function (articleId, callback) {
        var _this = this;
        // Let's prepare the requests.
        var headers = new http_1.Headers({
            'x-access-token': this.adminMainService.userJwtToken,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var wikiArticleConfigUrl = '/api/' + this.adminMainService.site + '/wiki-articles/' + articleId;
        // Call the HTTP service.
        this.http.get(wikiArticleConfigUrl, options)
            .map(this.extractData)
            .subscribe(function (resultArticle) {
            // Let's store the result.
            var indexToReplace = 0;
            var index = 0;
            _this.configWikiArticles.forEach(function (articleFromAll) {
                if (articleFromAll._id == articleId) {
                    indexToReplace = index;
                }
                index++;
            });
            // Replace.
            _this.configWikiArticles[indexToReplace] = resultArticle[0];
            // Call next callback.
            if (callback) {
                callback(resultArticle[0]);
            }
        }, function (error) {
            // Handle error.
            console.log(error);
            var errorMessage = error;
            _this.adminMainService.handleError(errorMessage, false, null);
        });
    };
    /**
     * Service to add a wiki article for a given site. We need to update the category as well.
     * Dependent HTTP calls were made :
     * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
     * But the category update is now done through REST API.
     */
    ConfigWikiService.prototype.addConfigWikiArticle = function (site, configWikiArticle) {
        var _this = this;
        // Let's make some adaptation on the element before requesting database.
        configWikiArticle.siteSlug = this.adminMainService.site;
        configWikiArticle.author = this.adminMainService.userLogin;
        // Let's prepare the requests.
        var configWikiArticleJSON = JSON.stringify(configWikiArticle);
        var headers = new http_1.Headers({
            'x-access-token': this.adminMainService.userJwtToken,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var wikiArticleConfigUrl = '/api/' + site + '/wiki-articles';
        // Call the HTTP service.
        this.http.post(wikiArticleConfigUrl, configWikiArticleJSON, options)
            .map(this.extractData)
            .subscribe(function (resultArticle) {
            // Finally let's recall the elements from database to refresh data.
            _this.getConfigWikiCategoriesAndArticles(_this.adminMainService.site, true);
        }, function (error) {
            // Handle error.
            console.log(error);
            var errorMessage = error;
            _this.adminMainService.handleError(errorMessage, false, null);
        });
    };
    /**
     * Service to update a wiki article config.
     */
    ConfigWikiService.prototype.updateConfigWikiArticle = function (wikiArticleConfig) {
        var _this = this;
        // Let's update the article now.
        wikiArticleConfig.siteSlug = this.adminMainService.site;
        var body = JSON.stringify({
            title: wikiArticleConfig.title,
            slug: wikiArticleConfig.slug,
            htmlContent: wikiArticleConfig.htmlContent,
            category: wikiArticleConfig.category
        });
        var headers = new http_1.Headers({
            'x-access-token': this.adminMainService.userJwtToken,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var wikiArticlesConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-articles/' + wikiArticleConfig._id;
        // Call the HTTP service.
        this.http.put(wikiArticlesConfigsUrl, body, options)
            .map(this.extractData)
            .subscribe(function (resultCategory) {
            // Update the elements.
            _this.getConfigWikiCategoriesAndArticles(_this.adminMainService.site, true);
        }, function (error) {
            // Handle error.
            console.log(error);
            var errorMessage = error;
            _this.adminMainService.handleError(errorMessage, false, null);
        });
    };
    /**
     * Service to add a wiki category config for a given site.
     */
    ConfigWikiService.prototype.addConfigWikiCategory = function (wikiCategoryConfig) {
        var _this = this;
        // Let's deal with the main method, compute body and headers.
        wikiCategoryConfig.siteSlug = this.adminMainService.site;
        if (wikiCategoryConfig.parentCategory == '') {
            wikiCategoryConfig.parentCategory = undefined;
        }
        var body = JSON.stringify(wikiCategoryConfig);
        var headers = new http_1.Headers({
            'x-access-token': this.adminMainService.userJwtToken,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var wikiCategoryConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-categories';
        // Call the HTTP service.
        this.http.post(wikiCategoryConfigsUrl, body, options)
            .map(this.extractData)
            .subscribe(function (resultCategory) {
            // Update the elements.
            _this.getConfigWikiCategoriesAndArticles(_this.adminMainService.site, true);
        }, function (error) {
            // Handle error.
            console.log(error);
            var errorMessage = error;
            _this.adminMainService.handleError(errorMessage, false, null);
        });
    };
    /**
     * Service to update a wiki category config.
     */
    ConfigWikiService.prototype.updateConfigWikiCategory = function (wikiCategoryConfig) {
        var _this = this;
        // Let's update the category now.
        wikiCategoryConfig.siteSlug = this.adminMainService.site;
        if (wikiCategoryConfig.parentCategory == '') {
            wikiCategoryConfig.parentCategory = undefined;
        }
        var body = JSON.stringify({
            name: wikiCategoryConfig.name,
            slug: wikiCategoryConfig.slug,
            description: wikiCategoryConfig.description,
            parentCategory: wikiCategoryConfig.parentCategory,
            childrenCategories: wikiCategoryConfig.childrenCategories,
            articlesIds: wikiCategoryConfig.articlesIds
        });
        var headers = new http_1.Headers({
            'x-access-token': this.adminMainService.userJwtToken,
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var wikiCategoryConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-categories/' + wikiCategoryConfig._id;
        // Call the HTTP service.
        this.http.put(wikiCategoryConfigsUrl, body, options)
            .map(this.extractData)
            .subscribe(function (resultCategory) {
            // Update the elements.
            _this.getConfigWikiCategoriesAndArticles(_this.adminMainService.site, true);
        }, function (error) {
            // Handle error.
            console.log(error);
            var errorMessage = error;
            _this.adminMainService.handleError(errorMessage, false, null);
        });
    };
    /**
     * Function to correctly map data from the HTTP service.
     */
    ConfigWikiService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Error handling method.
     */
    ConfigWikiService.prototype.handleError = function (error) {
        var errorJson = error.json();
        var errorMessage = errorJson.message;
        // Log detailed error on console.
        var errMsg = error.status + " - " + error.statusText + " : " + errorMessage;
        console.error(errMsg);
        console.error(errorJson);
        // Return simple error to the caller.
        return Observable_1.Observable.throw(errorMessage);
    };
    return ConfigWikiService;
}());
ConfigWikiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        admin_main_service_1.AdminMainService])
], ConfigWikiService);
exports.ConfigWikiService = ConfigWikiService;
//# sourceMappingURL=config-wiki.service.js.map