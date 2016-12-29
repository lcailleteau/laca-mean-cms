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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var config_site_service_1 = require("./config-site.service");
var AdminMainService = (function () {
    /**
     * Constructor with services injections.
     */
    function AdminMainService(http, router, configSiteService) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.configSiteService = configSiteService;
        // Let's subscribe to navigation end in router, in order to
        // reinit the message error before changing the route.
        router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                // Reinit of error message and flag, if no jump required.
                if (!_this.errorHandleOneMoreJump) {
                    _this.errorMessage = '';
                    _this.errorDisplayComponent = true;
                }
                else {
                    _this.errorHandleOneMoreJump = false;
                }
            }
        });
    }
    /**
     * Service to extract the correct site slug from the URL, and check it exists.
     */
    AdminMainService.prototype.fetchAndCheckSite = function (activatedRoute) {
        var _this = this;
        // Get site parameter.
        activatedRoute.params.forEach(function (params) {
            // Is this an observable technique ?
            _this.site = params['site'];
        });
        // Now comes the time to check that our site exists.
        this.siteExists = false;
        if (!this.configSites) {
            // Let's fetch sites from the database.
            this.configSiteService.getConfigSites()
                .subscribe(function (configSites) {
                _this.configSites = configSites;
                _this.checkSite();
            }, function (error) {
                _this.errorMessage = error;
            });
        }
        else {
            this.checkSite();
        }
    };
    /**
     * Private function to check site.
     */
    AdminMainService.prototype.checkSite = function () {
        var _this = this;
        this.configSites.forEach(function (configSite) {
            if (configSite.slug == _this.site) {
                _this.siteDetail = configSite;
                _this.siteExists = true;
            }
        });
        // If the site does not exist, let's  prepare an error message.
        if (!this.siteExists) {
            this.handleError("Le site demandé '" + this.site + "' n'existe pas.", false, this.site + "/login");
        }
    };
    /**
     * Service to handle error message, and possible route to login component or other.
     */
    AdminMainService.prototype.handleError = function (errorMessage, errorDisplayComponent, routeToNavigate) {
        // Reinit of error message and flag.
        this.errorMessage = errorMessage;
        this.errorDisplayComponent = errorDisplayComponent;
        this.errorHandleOneMoreJump = false;
        if (routeToNavigate) {
            this.router.navigate([routeToNavigate]);
            this.errorHandleOneMoreJump = true;
        }
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
            // Let's register user information.
            _this.userAuthenticated = true;
            _this.userJwtToken = jsonResponse.token;
            _this.userLogin = jsonResponse.login;
            _this.userEmail = jsonResponse.email;
            _this.userRoles = jsonResponse.roles;
            /*
            // Let's build the data to store in local storage.
            let dataToStore = JSON.stringify(
              {
                authenticated: true,
                token: jsonResponse.token,
                login: jsonResponse.login,
                email: jsonResponse.email,
                roles: jsonResponse.roles
              }
            );
    
            // Store in local storage.
            localStorage.setItem('currentUser', dataToStore);
            */
            // Let's route to the welcome component.
            _this.router.navigate([_this.site + '/']);
        }, function (error) {
            var currentErrorMessage;
            currentErrorMessage = error;
            var errorBodyMessage = error._body;
            if (errorBodyMessage) {
                var jsonError = JSON.parse(errorBodyMessage);
                // console.log("Error while login : ");
                // console.log(jsonError);
                if (jsonError && jsonError.message && jsonError.message.indexOf('User not found') > 0) {
                    currentErrorMessage = "Le login n'existe pas.";
                }
                else if (jsonError && jsonError.message && jsonError.message.indexOf('Wrong password') > 0) {
                    currentErrorMessage = "Le mot de passe est incorrect.";
                }
            }
            // Let's deal with the error.
            _this.handleError(currentErrorMessage, true, null);
        });
    };
    /**
     * Function to correctly map data from the HTTP service.
     */
    AdminMainService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    return AdminMainService;
}());
AdminMainService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router,
        config_site_service_1.ConfigSiteService])
], AdminMainService);
exports.AdminMainService = AdminMainService;
//# sourceMappingURL=admin-main.service.js.map