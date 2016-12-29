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
var config_wiki_service_1 = require("../../_services/config-wiki.service");
var admin_main_service_1 = require("../../_services/admin-main.service");
var ConfigWikiArticleComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigWikiArticleComponent(route, router, configWikiService, adminMainService) {
        this.route = route;
        this.router = router;
        this.configWikiService = configWikiService;
        this.adminMainService = adminMainService;
    }
    /**
     * OnInit method.
     */
    ConfigWikiArticleComponent.prototype.ngOnInit = function () {
        // Fetch and check site.
        this.adminMainService.fetchAndCheckSite(this.route);
        // Fetch the wiki articles from database.
        this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);
    };
    /**
     * Navigate.
     */
    ConfigWikiArticleComponent.prototype.buttonNavigate = function (routetoGo) {
        this.router.navigate([this.adminMainService.site + "/" + routetoGo]);
    };
    /**
     * Navigate.
     */
    ConfigWikiArticleComponent.prototype.buttonNavigateEditArticle = function () {
        if (this.selectedConfigWikiArticles.length > 0) {
            var idArticleToNavigateTo = this.selectedConfigWikiArticles[0]._id;
            this.router.navigate([this.adminMainService.site + "/config-wiki-article/" + idArticleToNavigateTo + "/edit"]);
        }
    };
    /**
     * When a category is chosen.
     */
    ConfigWikiArticleComponent.prototype.onCategoryChange = function (event) {
        var _this = this;
        // Init of the elements.
        this.selectedConfigWikiArticles = new Array();
        this.filteredConfigWikiArticles = new Array();
        this.filteredConfigWikiCategory = event;
        // Let's add the logic to filter articles to display.
        this.configWikiService.configWikiCategories.forEach(function (configWikiCategory) {
            if (configWikiCategory._id == event) {
                // Now we have found the category, we can go through the list of its articles.
                configWikiCategory.articlesIds.forEach(function (articleId) {
                    _this.configWikiService.configWikiArticles.forEach(function (articleFromAll) {
                        if (articleFromAll._id == articleId) {
                            // We have found an article member of the category, let's add it.
                            _this.filteredConfigWikiArticles.push(articleFromAll);
                        }
                    });
                });
            }
        });
    };
    return ConfigWikiArticleComponent;
}());
ConfigWikiArticleComponent = __decorate([
    core_1.Component({
        templateUrl: './_components/config-wiki/config-wiki-article.component.template.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        config_wiki_service_1.ConfigWikiService,
        admin_main_service_1.AdminMainService])
], ConfigWikiArticleComponent);
exports.ConfigWikiArticleComponent = ConfigWikiArticleComponent;
//# sourceMappingURL=config-wiki-article.component.js.map