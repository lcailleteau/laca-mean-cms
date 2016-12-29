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
var admin_main_service_1 = require("../../_services/admin-main.service");
var ConfigSiteComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigSiteComponent(route, adminMainService) {
        this.route = route;
        this.adminMainService = adminMainService;
        this.mode = 'Observable';
    }
    /**
     * OnInit method.
     */
    ConfigSiteComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get site parameter.
        this.route.params.forEach(function (params) {
            // Is this an observable technique ?
            _this.adminMainService.site = params['site'];
        });
    };
    return ConfigSiteComponent;
}());
ConfigSiteComponent = __decorate([
    core_1.Component({
        templateUrl: './_components/config-site/config-site.component.template.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        admin_main_service_1.AdminMainService])
], ConfigSiteComponent);
exports.ConfigSiteComponent = ConfigSiteComponent;
//# sourceMappingURL=config-site.component.js.map