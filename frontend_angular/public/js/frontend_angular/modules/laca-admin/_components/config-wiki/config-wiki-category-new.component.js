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
var config_wiki_category_1 = require('./config-wiki-category');
var config_wiki_service_1 = require('../../_services/config-wiki.service');
var admin_main_service_1 = require('../../_services/admin-main.service');
var ConfigWikiCategoryNewComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function ConfigWikiCategoryNewComponent(route, router, configWikiService, adminMainService) {
        this.route = route;
        this.router = router;
        this.configWikiService = configWikiService;
        this.adminMainService = adminMainService;
        /*
        TO ACTIVATE ANIMATION :
         @HostBinding('style.display') get display() {
           return 'block';
         }
        */
        /*
         @HostBinding('style.position') get position() {
           return 'absolute';
         }
         */
        // errorMessage: string;
        this.allWikiCategoryNames = [];
        // Model for our component.
        this.configWikiCategory = new config_wiki_category_1.ConfigWikiCategory();
    }
    Object.defineProperty(ConfigWikiCategoryNewComponent.prototype, "routeAnimation", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * OnInit method.
     */
    ConfigWikiCategoryNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get site parameter.
        this.route.params.forEach(function (params) {
            // Is this an observable technique ?
            _this.adminMainService.site = params['site'];
        });
        // Fetch the categories names from database.
        this.getAllWikiCategoryNames();
    };
    /**
     * Navigate.
     */
    ConfigWikiCategoryNewComponent.prototype.buttonNavigate = function (routetoGo) {
        this.router.navigate([(this.adminMainService.site + "/" + routetoGo)]);
    };
    /**
     * OnSubmit method.
     */
    ConfigWikiCategoryNewComponent.prototype.onSubmit = function () {
        // Let's require the add wiki category component.
        this.addWikiCategoryConfigs();
        // We can navigate back to the list of categories.
        this.router.navigate([this.adminMainService.site + '/config-wiki-category']);
    };
    /**
     * Add a wiki category configs.
     */
    ConfigWikiCategoryNewComponent.prototype.addWikiCategoryConfigs = function () {
        this.configWikiService.addConfigWikiCategories(this.adminMainService.site, this.configWikiCategory)
            .subscribe(function (wikiCategoryConfigs) {
            console.log("AFTER SUBSCRIBE ADD CAT CONF");
            console.log(wikiCategoryConfigs);
            //this.wikiCategoryConfigs = wikiCategoryConfigs
        }, function (error) {
            console.log("ERROR on add config");
            console.log(error);
            // this.errorMessage = <any>error;
            //  this.errorMessage = error;
        });
    };
    /**
     * Map data.
     */
    ConfigWikiCategoryNewComponent.prototype.mapData = function (configWikiCategory) {
        return { name: configWikiCategory.name, id: configWikiCategory._id };
    };
    /**
     * Get wiki category configs.
     */
    ConfigWikiCategoryNewComponent.prototype.getAllWikiCategoryNames = function () {
        this.allWikiCategoryNames.push({ name: 'Catégorie racine', id: '' });
        /*
             this.configWikiService.getConfigWikiCategories(this.adminMainService.site)
               .subscribe(
                 wikiCategoryConfigs => {
                   // this.wikiCategoryConfigs = wikiCategoryConfigs
                   //this.wikiConfigService.wikiCategoryConfigs = wikiCategoryConfigs
        
                   this.allWikiCategoryNames = this.allWikiCategoryNames.concat(wikiCategoryConfigs.map(this.mapData));
                 },
                 error => {
            //       this.errorMessage = <any>error;
                 });
                 */
    };
    __decorate([
        core_1.HostBinding('@routeAnimation'), 
        __metadata('design:type', Object)
    ], ConfigWikiCategoryNewComponent.prototype, "routeAnimation", null);
    ConfigWikiCategoryNewComponent = __decorate([
        core_1.Component({
            templateUrl: './_components/config-wiki/config-wiki-category-new.component.template.html',
            animations: [
                core_1.trigger('routeAnimation', [
                    core_1.state('*', core_1.style({
                        opacity: 1,
                        transform: 'translateX(0)'
                    })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, config_wiki_service_1.ConfigWikiService, admin_main_service_1.AdminMainService])
    ], ConfigWikiCategoryNewComponent);
    return ConfigWikiCategoryNewComponent;
}());
exports.ConfigWikiCategoryNewComponent = ConfigWikiCategoryNewComponent;
//# sourceMappingURL=config-wiki-category-new.component.js.map