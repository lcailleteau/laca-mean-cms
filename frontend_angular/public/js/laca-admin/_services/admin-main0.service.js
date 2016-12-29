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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var config_site_service_1 = require('./config-site.service');
var AdminMainService = (function () {
    /*
      userDisplayInfo: String;
    
      userAuthenticated: any;
    
    */
    /**
     * Constructor with services injections.
     */
    function AdminMainService(http, router, configSiteService) {
        this.http = http;
        this.router = router;
        this.configSiteService = configSiteService;
    }
    /**
     * Service to extract the correct site slug from the URL.
     */
    AdminMainService.prototype.fetchSite = function (activatedRoute) {
        var _this = this;
        // Get site parameter.
        activatedRoute.params.forEach(function (params) {
            // Is this an observable technique ?
            _this.site = params['site'];
        });
    };
    /**
     * Check site, to ensure that we have one in database corresponding to the URL required.
     */
    AdminMainService.prototype.checkSite = function () {
        var _this = this;
        this.configSiteService.getConfigSites()
            .subscribe(function (configSites) {
            // Now comes the time to check that our site exists.
            _this.siteExists = false;
            configSites.forEach(function (configSite) {
                if (configSite.slug == _this.site) {
                    _this.siteDetail = configSite;
                    _this.siteExists = true;
                }
            });
            // If the site does not exist, let's prepare an error message.
            if (!_this.siteExists) {
                _this.loginErrorMessage = "Le site demandé '" + _this.site + "' n'existe pas.";
                _this.loginFormVisible = false;
            }
        }, function (error) {
            _this.loginErrorMessage = error;
        });
    };
    /**
     * Login method.
     */
    AdminMainService.prototype.login = function (login, password) {
        var _this = this;
        // Body and headers.
        var body = JSON.stringify({ login: login, password: password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // URL to the web API.
        var authenticationUrl = '/api/authenticate';
        // Call the HTTP service for authentication.
        this.http.post(authenticationUrl, body, options)
            .map(this.extractData)
            .subscribe(function (jsonResponse) {
            // Let's build the data to store in local storage.
            var dataToStore = JSON.stringify({
                authenticated: true,
                token: jsonResponse.token,
                login: jsonResponse.login,
                email: jsonResponse.email,
                roles: jsonResponse.roles
            });
            console.log("from admin main service - login : " + dataToStore);
            // Let's set the token property.
            //  this.adminMainService.userAuthenticated = dataToStore;
            // We can store username and jwt token in local storage to keep user logged in between page refreshes.
            // localStorage.setItem('currentUser', JSON.stringify({ login: login, token: token }));
            console.log("from laca authenticatio nservice datatostore 1" + dataToStore);
            localStorage.setItem('currentUser', dataToStore);
            console.log("from laca authenticatio nservice datatostore 2" + dataToStore);
            //console.log('AUTHENT : we set in storage the token : ' + this.adminMainService.userAuthenticated);
            // Return true to indicate successful login.
            // return true;
            //return dataToStore;
            _this.router.navigate([_this.site + '/']);
            //return this.extractData(result);
        }, function (error) {
            _this.loginErrorMessage = error;
        });
    };
    /**
     * Error handling method.
      */
    AdminMainService.prototype.handleError = function (error) {
        var errorJson = error.json();
        var errorMessage = errorJson.message;
        // Log detailed error on console.
        /*
        let errMsg = `${error.status} - ${error.statusText} : ${errorMessage}`;
        console.error(errMsg);
        console.error(errorJson);
    */
        // Return simple error to the caller.
        // return Observable.throw(errorMessage);
        // return JSON.stringify({"authenticated": false, "errorMessage": errorMessage });
        var errorResponse = JSON.stringify({ "authenticated": false, "errorMessage": errorMessage });
        console.log("bon qd meme : " + errorResponse);
        //
        return errorResponse;
        //  return Observable.throw(errorResponse);
    };
    /**
     * Function to correctly map data from the HTTP service.
     */
    AdminMainService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Service to route to login component, and dispay a specific error message.
     */
    AdminMainService.prototype.routeToLoginWithError = function (errorMessage) {
        this.loginErrorMessage = errorMessage;
        this.router.navigate([(this.site + "/login")]);
    };
    AdminMainService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, config_site_service_1.ConfigSiteService])
    ], AdminMainService);
    return AdminMainService;
}());
exports.AdminMainService = AdminMainService;
//# sourceMappingURL=admin-main0.service.js.map