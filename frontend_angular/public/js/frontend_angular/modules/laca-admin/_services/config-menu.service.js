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
var ConfigMenuService = (function () {
    /**
     * Constructor.
     */
    function ConfigMenuService(http) {
        this.http = http;
    }
    /**
     * Service to get all config menus for a given site.
     */
    ConfigMenuService.prototype.getConfigMenus = function (site) {
        // Here we are not having a Promise with a then method, but instead
        // it is an Observable of HTTP responses from the RxJS library.
        // Map is one of RxJS operators.
        // URL to the web API.
        var menuConfigsUrl = '/api/' + site + '/menus';
        // Returns the observable.
        return this.http.get(menuConfigsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * Private method to extract data.
     */
    ConfigMenuService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Handle error method.
     */
    ConfigMenuService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ConfigMenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigMenuService);
    return ConfigMenuService;
}());
exports.ConfigMenuService = ConfigMenuService;
//# sourceMappingURL=config-menu.service.js.map