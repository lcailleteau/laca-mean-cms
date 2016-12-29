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
var admin_main_service_1 = require('../../_services/admin-main.service');
var config_site_service_1 = require('../../_services/config-site.service');
var LacaLoginComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function LacaLoginComponent(route, router, adminMainService, configSiteService) {
        this.route = route;
        this.router = router;
        this.adminMainService = adminMainService;
        this.configSiteService = configSiteService;
    }
    /**
     * OnInit method.
     */
    LacaLoginComponent.prototype.ngOnInit = function () {
        // Fetch site.
        this.adminMainService.fetchSite(this.route);
        // Check site.
        this.adminMainService.checkSite();
    };
    /**
     * OnSubmit method.
     */
    LacaLoginComponent.prototype.onSubmit = function () {
        // Let's authenticate, and check roles.
        this.adminMainService.login(this.login, this.password);
        /*
            this.authenticationService.login(this.login, this.password).subscribe(
              result => {
        
        
        
              //  this.handleAuthentResult(result);
        
            this.authenticationService.extractData2(result);
        */
        //
        //if (result === true) {
        //  this.router.navigate([this.adminMainService.site + '/']);
        //} else {
        //  this.errorMessage = 'Le login ou le mot de passe est incorrect.';
        //  }
        /*
              },
              error => {
                //this.handleAuthentResult(error);
              }
            );
        */
        //  this.authenticationService.login(this.login, this.password);
        /*
        let afterLogin = (result: String) : void => {
          console.log("INSIDE AFTER LOGIN !!!!! boudiou");
            console.log(result);
        
        
        
        
                let resultJson = JSON.parse(result);
        
          console.log("INSIDE AFTER LOGIN !!!!! resultJson " + resultJson);
        
        
        
                if (resultJson.authenticated == true) {
                  this.adminMainService.userDisplayInfo = resultJson.login;
        
        
            console.log("from insied laca login handleauthentresult : token = " + this.adminMainService.userAuthenticated);
        
                  this.router.navigate([this.adminMainService.site + '/']);
        
                  }
        }
        */
        //  this.authenticationService.login(this.login, this.password);
    };
    LacaLoginComponent = __decorate([
        core_1.Component({
            templateUrl: './_components/laca-login/laca-login.component.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, admin_main_service_1.AdminMainService, config_site_service_1.ConfigSiteService])
    ], LacaLoginComponent);
    return LacaLoginComponent;
}());
exports.LacaLoginComponent = LacaLoginComponent;
//# sourceMappingURL=laca-login0.component.old.js.map