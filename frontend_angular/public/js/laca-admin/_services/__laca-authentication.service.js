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
var LacaAuthenticationService = (function () {
    /**
     * Constructor to inject services.
     */
    function LacaAuthenticationService(http, adminMainService) {
        // @Inject('AdminMainService') adminMainService: AdminMainService) {
        this.http = http;
        this.adminMainService = adminMainService;
        /*
        // We can fetch the saved token from local storage, if exists.
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    
    console.log('CONSTRUCTOR de LAcaAuthentiaction Service avec oken : ' + currentUser.token);
        this.token = currentUser && currentUser.token;
        */
    }
    /**
     * Login method.
     */
    //login(login: String, password: String): Observable<String> {
    LacaAuthenticationService.prototype.login = function (login, password) {
        // Body and headers.
        var body = JSON.stringify({ login: login, password: password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // URL to the web API.
        var authenticationUrl = '/api/authenticate';
        console.log("from laca authenticatio nservice ADMIN MAI ");
        console.log("from laca authenticatio nservice ADMIN MAI NSVC" + this.adminMainService);
        // Call the HTTP service.
        return this.http.post(authenticationUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        /*
                 this.http.post(authenticationUrl, body, options)
                  .subscribe(result => {
                     return this.extractData(result);
                  });
        */
        //return httpObservable;
        /*
                  ,
                  error => {
                   //  this.handleAuthentResult(error);
                   Observable.throw(error);
                 }*/
        //);
    };
    /**
     * Login method.
     */
    //login(login: String, password: String): Observable<String> {
    LacaAuthenticationService.prototype.login2 = function (login, password, onNext) {
        // Body and headers.
        var body = JSON.stringify({ login: login, password: password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // URL to the web API.
        var authenticationUrl = '/api/authenticate';
        console.log("from laca authenticatio nservice ADMIN MAI ");
        console.log("from laca authenticatio nservice ADMIN MAI NSVC" + this.adminMainService);
        // Call the HTTP service.
        /*
            return this.http.post(authenticationUrl, body, options)
                .map(this.extractData)
                .catch(this.handleError);
        */
        // Cf. https://ievangelist.github.io/blog/angular-2-http/
        this.http.post(authenticationUrl, body, options)
            .map(function (response) { return response.json(); })
            .subscribe(onNext, function (error) { return console.log("An error occurred when requesting api/foobar.", error); });
        //result => {
        //return this.extractData(result);
        //return httpObservable;
        /*
                  ,
                  error => {
                   //  this.handleAuthentResult(error);
                   Observable.throw(error);
                 }*/
        //);
    };
    /**
     * Function to correctly map data from the HTTP service.
     */
    LacaAuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    /**
     * Function to correctly map data from the HTTP service.
     */
    // extractData2(response: Response): String {
    LacaAuthenticationService.prototype.extractData2 = function (jsonResponse) {
        console.log("extractData2 - response = " + jsonResponse);
        console.log("extractData2 - response typz = " + typeof (jsonResponse));
        // Login is successful if there's a jwt token in the response.
        //  if (response.json() && response.json().token) {
        //    let jsonResponse = response.json();
        console.log("from laca authenticatio nservice datatostore -1");
        console.log("from laca authenticatio nservice ADMIN MAI NSVC ---777" + this.adminMainService);
        console.log("from laca authenticatio nservice ADMIN MAI NSVC ---999");
        // Let's build the data to store in local storage.
        var dataToStore = JSON.stringify({
            authenticated: true,
            token: jsonResponse.token,
            login: jsonResponse.login,
            email: jsonResponse.email,
            roles: jsonResponse.roles
        });
        console.log("from laca authenticatio nservice datatostore 0" + dataToStore);
        console.log("from laca authenticatio nservice datatostore aaaa" + this.adminMainService);
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
        return dataToStore;
        // return true;
        //return token;
        /*
            } else {
                // Return false to indicate failed login.
                // return false;
                return JSON.stringify(
                  {"authenticated": false,
                   "errorMessage": "Le login ou le mot de passe est incorrect. SI SI !!"});
            }*/
    };
    /**
     * Error handling method.
      */
    LacaAuthenticationService.prototype.handleError = function (error) {
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
        //return errorResponse;
        return Observable_1.Observable.throw(errorResponse);
    };
    /**
     * Logout method.
     */
    LacaAuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        // this.token = null;
        //this.adminMainService
        localStorage.removeItem('currentUser');
    };
    LacaAuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, admin_main_service_1.AdminMainService])
    ], LacaAuthenticationService);
    return LacaAuthenticationService;
}());
exports.LacaAuthenticationService = LacaAuthenticationService;
//# sourceMappingURL=__laca-authentication.service.js.map