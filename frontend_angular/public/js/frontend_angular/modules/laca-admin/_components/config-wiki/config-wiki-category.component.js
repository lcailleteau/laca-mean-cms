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
var config_wiki_service_1 = require('../../_services/config-wiki.service');
var admin_main_service_1 = require('../../_services/admin-main.service');
var ConfigWikiCategoryComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigWikiCategoryComponent(route, router, configWikiService, adminMainService) {
        this.route = route;
        this.router = router;
        this.configWikiService = configWikiService;
        this.adminMainService = adminMainService;
    }
    /**
     * OnInit method.
     */
    ConfigWikiCategoryComponent.prototype.ngOnInit = function () {
        // Fetch and check site.
        this.adminMainService.fetchAndCheckSite(this.route);
        // Fetch the wiki categories from database.
        this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);
    };
    /**
     * Navigate.
     */
    ConfigWikiCategoryComponent.prototype.buttonNavigate = function (routetoGo) {
        this.router.navigate([(this.adminMainService.site + "/" + routetoGo)]);
    };
    ConfigWikiCategoryComponent = __decorate([
        core_1.Component({
            templateUrl: './_components/config-wiki/config-wiki-category.component.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, config_wiki_service_1.ConfigWikiService, admin_main_service_1.AdminMainService])
    ], ConfigWikiCategoryComponent);
    return ConfigWikiCategoryComponent;
}());
exports.ConfigWikiCategoryComponent = ConfigWikiCategoryComponent;
//# sourceMappingURL=config-wiki-category.component.js.map