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
var admin_main_service_1 = require("../_services/admin-main.service");
var AuthentAuthorizeGuard = (function () {
    function AuthentAuthorizeGuard(router, adminMainService) {
        this.router = router;
        this.adminMainService = adminMainService;
    }
    /**
     * The canActivate method.
     */
    AuthentAuthorizeGuard.prototype.canActivate = function (route) {
        // First of all, let's check the authentication.
        // if (! localStorage.getItem('currentUser')) {
        if (!this.adminMainService.userAuthenticated) {
            console.log('GUARD : no authentication...');
            // If no authentication, let' route to the login page.
            this.adminMainService.errorMessage = "Vous n'êtes plus connecté, veuillez saisir vos identifiants";
            this.adminMainService.errorDisplayComponent = true;
            this.router.navigate([route.params['site'] + '/login']);
            return false;
        }
        // Ok, we are connected, let's check the roles now.
        var rolesFromLoggedUser = this.adminMainService.userRoles;
        var rolesExpectedByRoute = route.data['roles'];
        var allow = false;
        rolesFromLoggedUser.forEach(function (roleFromLoggedUserObj) {
            var roleFromLoggedUser = roleFromLoggedUserObj.type;
            // We need to check if this specific role is allowed by the route.
            rolesExpectedByRoute.forEach(function (roleFromRoute) {
                if (roleFromRoute == roleFromLoggedUser) {
                    allow = true;
                }
            });
        });
        // Let's make the routing.
        if (!allow) {
            this.adminMainService.errorMessage = "Vous ne disposez pas des autorisations nécessaires pour accéder à cet écran.";
            this.adminMainService.errorDisplayComponent = true;
            // this.router.navigate([route.params['site'] + '/login']);
            return false;
        }
        // If every check went fine, let's allow the connection.
        return true;
    };
    return AuthentAuthorizeGuard;
}());
AuthentAuthorizeGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        admin_main_service_1.AdminMainService])
], AuthentAuthorizeGuard);
exports.AuthentAuthorizeGuard = AuthentAuthorizeGuard;
//# sourceMappingURL=authent-authorize.guard.js.map