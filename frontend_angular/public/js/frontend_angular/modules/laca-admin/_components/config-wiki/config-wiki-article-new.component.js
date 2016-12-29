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
var config_wiki_article_1 = require('./config-wiki-article');
var config_wiki_service_1 = require('../../_services/config-wiki.service');
var admin_main_service_1 = require('../../_services/admin-main.service');
var ConfigWikiArticleNewComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigWikiArticleNewComponent(route, router, configWikiService, adminMainService) {
        this.route = route;
        this.router = router;
        this.configWikiService = configWikiService;
        this.adminMainService = adminMainService;
        //allWikiCategoryNames: any[] = [];
        // Model for our component.
        this.configWikiArticle = new config_wiki_article_1.ConfigWikiArticle();
        this.content = '<p>Hello <strong>World !</strong></p>';
    }
    /**
     * OnInit method.
     */
    ConfigWikiArticleNewComponent.prototype.ngOnInit = function () {
        // Fetch and check site.
        this.adminMainService.fetchAndCheckSite(this.route);
        // Fetch the wiki articles from database.
        this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);
    };
    /**
     * Navigate.
     */
    ConfigWikiArticleNewComponent.prototype.buttonNavigate = function (routetoGo) {
        this.router.navigate([(this.adminMainService.site + "/" + routetoGo)]);
    };
    /**
     * OnSubmit method.
     */
    ConfigWikiArticleNewComponent.prototype.onSubmit = function () {
        // Let's require the add wiki category component.
        this.addWikiCategoryConfigs();
        // We can navigate back to the list of categories.
        this.router.navigate([this.adminMainService.site + '/config-wiki-category']);
    };
    /**
     * Add a wiki category configs.
     */
    ConfigWikiArticleNewComponent.prototype.addWikiCategoryConfigs = function () {
        /*
        this.configWikiService.addConfigWikiCategories(this.adminMainService.site, this.configWikiCategory)
          .subscribe(
            wikiCategoryConfigs => {
              console.log("AFTER SUBSCRIBE ADD CAT CONF");
              console.log(wikiCategoryConfigs);
    
              //this.wikiCategoryConfigs = wikiCategoryConfigs
            },
            error => {
    
              console.log("ERROR on add config");
              console.log(error);
    
              // this.errorMessage = <any>error;
            //  this.errorMessage = error;
            });
    
            */
    };
    ConfigWikiArticleNewComponent = __decorate([
        core_1.Component({
            templateUrl: './_components/config-wiki/config-wiki-article-new.component.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, config_wiki_service_1.ConfigWikiService, admin_main_service_1.AdminMainService])
    ], ConfigWikiArticleNewComponent);
    return ConfigWikiArticleNewComponent;
}());
exports.ConfigWikiArticleNewComponent = ConfigWikiArticleNewComponent;
//# sourceMappingURL=config-wiki-article-new.component.js.map