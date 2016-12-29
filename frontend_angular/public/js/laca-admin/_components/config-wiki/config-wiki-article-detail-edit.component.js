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
var ConfigWikiArticleDetailEditComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigWikiArticleDetailEditComponent(route, router, configWikiService, adminMainService) {
        this.route = route;
        this.router = router;
        this.configWikiService = configWikiService;
        this.adminMainService = adminMainService;
    }
    /**
     * OnInit method.
     */
    ConfigWikiArticleDetailEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Fetch and check site.
        this.adminMainService.fetchAndCheckSite(this.route);
        // Let's find the correct article to edit.
        var articleId = '';
        this.route.params.forEach(function (params) {
            articleId = params['articleId'];
        });
        // Even if the article may noy be complete yet, because of a missing
        // htmlContent part, we need to fill it for a display in the component.
        // The html content will be synchronized later.
        this.configWikiService.configWikiArticles.forEach(function (currConfigWikiArticle) {
            if (currConfigWikiArticle._id == articleId) {
                _this.configWikiArticle = currConfigWikiArticle;
            }
        });
        // Besides of the search of the element to display, we need to get the html content of the article.
        this.configWikiService.getConfigWikiArticleDetail(articleId, function (detailedConfigWikiArticle) {
            _this.configWikiArticle = detailedConfigWikiArticle;
        });
    };
    /**
     * Navigate.
     */
    ConfigWikiArticleDetailEditComponent.prototype.buttonNavigate = function (routetoGo) {
        this.router.navigate([this.adminMainService.site + "/" + routetoGo]);
    };
    /**
     * OnSubmit method.
     */
    ConfigWikiArticleDetailEditComponent.prototype.onSubmit = function () {
        // Let's add the article.
        this.configWikiService.updateConfigWikiArticle(this.configWikiArticle);
        // We can navigate back to the list of articles.
        this.router.navigate([this.adminMainService.site + '/config-wiki-article']);
    };
    return ConfigWikiArticleDetailEditComponent;
}());
ConfigWikiArticleDetailEditComponent = __decorate([
    core_1.Component({
        templateUrl: './_components/config-wiki/config-wiki-article-detail-edit.component.template.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        config_wiki_service_1.ConfigWikiService,
        admin_main_service_1.AdminMainService])
], ConfigWikiArticleDetailEditComponent);
exports.ConfigWikiArticleDetailEditComponent = ConfigWikiArticleDetailEditComponent;
//# sourceMappingURL=config-wiki-article-detail-edit.component.js.map