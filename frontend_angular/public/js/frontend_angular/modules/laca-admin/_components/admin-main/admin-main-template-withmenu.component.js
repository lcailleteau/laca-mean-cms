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
var laca_menuitem_1 = require('../laca-menu/laca-menuitem');
var admin_main_service_1 = require('../../_services/admin-main.service');
var AdminMainTemplateWithMenuComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function AdminMainTemplateWithMenuComponent(route, router, adminMainService) {
        this.route = route;
        this.router = router;
        this.adminMainService = adminMainService;
    }
    /**
     * OnInit method.
     */
    AdminMainTemplateWithMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Fetch the site from the activated route.
        this.route.params.forEach(function (params) {
            // Is this an observable technique ?
            _this.adminMainService.site = params['site'];
        });
        // Buiild left menu items.
        this.buildLeftMenuItems();
    };
    /**
     * Build left menu items.
     */
    AdminMainTemplateWithMenuComponent.prototype.buildLeftMenuItems = function () {
        this.leftMenuItems = [
            laca_menuitem_1.LacaMenuItem.headerItem("Général"),
            laca_menuitem_1.LacaMenuItem.leafItem("Accueil", "", true, "info-sign"),
            laca_menuitem_1.LacaMenuItem.leafItem("Site", "/crisis-center", false, "info-sign"),
            laca_menuitem_1.LacaMenuItem.leafItem("Users", "/home", true, "user"),
            laca_menuitem_1.LacaMenuItem.headerItem("Gestion de contenu"),
            laca_menuitem_1.LacaMenuItem.leafItem("Homepages", "/homes", true, "home"),
            laca_menuitem_1.LacaMenuItem.leafItem("Fragments HTML", "/frag", true, "object-align"),
            laca_menuitem_1.LacaMenuItem.accordionItem("Wiki", "duplicate", false, true, [
                laca_menuitem_1.LacaMenuItem.leafItem("Catégories", "/config-wiki-category", true, "folder-open"),
                laca_menuitem_1.LacaMenuItem.leafItem("Articles", "/frag", true, "pencil")
            ]),
            laca_menuitem_1.LacaMenuItem.accordionItem("Exercices", "duplicate", false, true, [
                laca_menuitem_1.LacaMenuItem.leafItem("Catégories", "/config-wiki-category", true, "folder-open"),
                laca_menuitem_1.LacaMenuItem.leafItem("Exercices", "/frag", true, "pencil")
            ]),
            laca_menuitem_1.LacaMenuItem.leafItem("Gestionnaire de médias", "/frag", true, "picture"),
            laca_menuitem_1.LacaMenuItem.headerItem("Mise en forme"),
            laca_menuitem_1.LacaMenuItem.leafItem("Menus", "/config-menu", true, "picture"),
            laca_menuitem_1.LacaMenuItem.leafItem("Modèles de pages", "/frag", true, "picture")
        ];
    };
    AdminMainTemplateWithMenuComponent = __decorate([
        core_1.Component({
            templateUrl: './_components/admin-main/admin-main-template-withmenu.component.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, admin_main_service_1.AdminMainService])
    ], AdminMainTemplateWithMenuComponent);
    return AdminMainTemplateWithMenuComponent;
}());
exports.AdminMainTemplateWithMenuComponent = AdminMainTemplateWithMenuComponent;
//# sourceMappingURL=admin-main-template-withmenu.component.js.map