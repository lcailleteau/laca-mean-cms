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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('../rxjs-operators');
var admin_main_service_1 = require('./admin-main.service');
var ConfigWikiService = (function () {
    function ConfigWikiService(http, adminMainService) {
        this.http = http;
        this.adminMainService = adminMainService;
        this.configWikiCategoryNames = [];
    }
    /**
     * Service to get all wiki categories configs for a given site.
  
    getConfigWikiCategories(site: String): Observable<ConfigWikiCategory[]> {
      // Body and headers.
      let headers = new Headers({ 'x-access-token': this.adminMainService.userJwtToken });
      let options = new RequestOptions({ headers: headers });
  
      // URL to the web API.
      let wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
  
      // Call the HTTP service.
      return this.http.get(wikiCategoryConfigsUrl, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
  
  */
    /**
     * Service to get all wiki categories configs for a given site.
     */
    // getConfigWikiCategories2(site: String): Observable<ConfigWikiCategory[]> {
    // http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
    /*
    getConfigWikiCategories(site: String) {
      // Body and headers.
      let headers = new Headers({ 'x-access-token': this.adminMainService.userJwtToken });
      let options = new RequestOptions({ headers: headers });
  
      // URL to the web API.
      let wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
  
      // Call the HTTP service.
      //return this.http.get(wikiCategoryConfigsUrl, options)
      this.http.get(wikiCategoryConfigsUrl, options)
        .map(this.extractData)
        .subscribe((wikiCategoryConfigsArray) => {
          // Register config categories.
          this.configWikiCategories = wikiCategoryConfigsArray;
  
          // Add a parent category display for every category.
          this.configWikiCategories.forEach((configWikiCategory: ConfigWikiCategory) => {
            if (configWikiCategory.parentCategory == null ||
                configWikiCategory.parentCategory == '') {
              configWikiCategory.parentCategoryDisplay = '';
            } else {
              this.configWikiCategories.forEach((wikiCategoryConfigSearch: ConfigWikiCategory) => {
                if (wikiCategoryConfigSearch._id == configWikiCategory.parentCategory) {
                  configWikiCategory.parentCategoryDisplay = wikiCategoryConfigSearch.name;
                }
              });
            };
          });
        },
        error => {
          // Handle error.
          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
    }
    */
    /**
     * Service to get all wiki articles configs for a given site.
     */
    // getConfigWikiArticles(site: String): Observable<ConfigWikiArticle[]> {
    /*
    getConfigWikiArticles(site: String) {
      // Body and headers.
      let headers = new Headers({ 'x-access-token': this.adminMainService.userJwtToken });
      let options = new RequestOptions({ headers: headers });
  
      // URL to the web API.
      let wikiArticleConfigsUrl = '/api/' + site + '/wiki-articles';
  
      // Call the HTTP service.
      this.http.get(wikiArticleConfigsUrl, options)
        .map(this.extractData)
        .subscribe(
          configWikiArticles => {
            // Register config articles.
            this.configWikiArticles = configWikiArticles;
  
  
  
            console.log('obj = ' + configWikiArticles);
            console.log( configWikiArticles);
          },
          error => {
            // Handle error.
            let errorMessage = <any>error;
            this.adminMainService.handleError(errorMessage, false, null);
          });
    }
  */
    /**
     * Service to get all wiki categories configs and articles for a given site.
     * We use the parallel http call pattern.
     * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
     */
    // getConfigWikiCategories2(site: String): Observable<ConfigWikiCategory[]> {
    // http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
    ConfigWikiService.prototype.getConfigWikiCategoriesAndArticles = function (site) {
        var _this = this;
        if (!this.configWikiInitialized) {
            // Body and headers.
            var headers = new http_1.Headers({ 'x-access-token': this.adminMainService.userJwtToken });
            var options = new http_1.RequestOptions({ headers: headers });
            // URLs to the web API, for categories and articles.
            var wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
            var wikiArticleConfigsUrl = '/api/' + site + '/wiki-articles';
            // Call the HTTP services in parallel.
            Observable_1.Observable.forkJoin([
                this.http.get(wikiCategoryConfigsUrl, options).map(this.extractData),
                this.http.get(wikiArticleConfigsUrl, options).map(this.extractData)])
                .subscribe(function (forkJoinResult) {
                // Let's register the fetched objects, categories and articles.
                _this.configWikiCategories = forkJoinResult[0];
                _this.configWikiArticles = forkJoinResult[1];
                // Finally, let's handle specific treatment.
                _this.specificTreatmentWikiCategories();
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
     * Specific treatment for categories.
     */
    ConfigWikiService.prototype.specificTreatmentWikiCategories = function () {
        var _this = this;
        // Add a parent category display for every category.
        this.configWikiCategories.forEach(function (configWikiCategory) {
            if (configWikiCategory.parentCategory == null ||
                configWikiCategory.parentCategory == '') {
                configWikiCategory.parentCategoryDisplay = '';
            }
            else {
                _this.configWikiCategories.forEach(function (wikiCategoryConfigSearch) {
                    if (wikiCategoryConfigSearch._id == configWikiCategory.parentCategory) {
                        configWikiCategory.parentCategoryDisplay = wikiCategoryConfigSearch.name;
                    }
                });
            }
            ;
        });
        // Build the list of category names, ordered by level, parent containing children...
        this.configWikiCategoryNames.push({ name: 'Catégorie racine', id: '' });
        this.configWikiCategories.forEach(function (wikiCategoryConfigSearch) {
            _this.configWikiCategoryNames.push({ name: wikiCategoryConfigSearch.name, id: wikiCategoryConfigSearch._id });
        });
    };
    /**
     * Service to add a wiki categories config for a given site.
     */
    ConfigWikiService.prototype.addConfigWikiCategories = function (site, wikiCategoryConfig) {
        // Body and headers.
        var body = JSON.stringify([wikiCategoryConfig]);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // URL to the web API.
        var wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
        // Call the HTTP service.
        return this.http.post(wikiCategoryConfigsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
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
    ConfigWikiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, admin_main_service_1.AdminMainService])
    ], ConfigWikiService);
    return ConfigWikiService;
}());
exports.ConfigWikiService = ConfigWikiService;
//# sourceMappingURL=config-wiki.service.js.map