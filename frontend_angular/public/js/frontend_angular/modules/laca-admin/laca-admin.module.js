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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var admin_main_component_1 = require('./_components/admin-main/admin-main.component');
var admin_main_template_withmenu_component_1 = require('./_components/admin-main/admin-main-template-withmenu.component');
var admin_main_template_withoutmenu_component_1 = require('./_components/admin-main/admin-main-template-withoutmenu.component');
var admin_main_service_1 = require('./_services/admin-main.service');
var laca_welcome_component_1 = require('./_components/laca-welcome/laca-welcome.component');
var laca_login_component_1 = require('./_components/laca-login/laca-login.component');
var config_site_service_1 = require('./_services/config-site.service');
var config_homepage_component_1 = require('./_components/config-homepage/config-homepage.component');
var config_menu_component_1 = require('./_components/config-menu/config-menu.component');
var config_menu_service_1 = require('./_services/config-menu.service');
var config_wiki_category_component_1 = require('./_components/config-wiki/config-wiki-category.component');
var config_wiki_category_new_component_1 = require('./_components/config-wiki/config-wiki-category-new.component');
var config_wiki_article_component_1 = require('./_components/config-wiki/config-wiki-article.component');
var config_wiki_article_new_component_1 = require('./_components/config-wiki/config-wiki-article-new.component');
var config_wiki_service_1 = require('./_services/config-wiki.service');
var laca_table_component_1 = require('./_components/laca-table/laca-table.component');
var laca_column_component_1 = require('./_components/laca-table/laca-column.component');
var laca_menu_component_1 = require('./_components/laca-menu/laca-menu.component');
var laca_menuitem_component_1 = require('./_components/laca-menu/laca-menuitem.component');
var laca_admin_routing_1 = require('./laca-admin.routing');
var authent_authorize_guard_1 = require('./_guards/authent-authorize.guard');
var LacaAdminModule = (function () {
    function LacaAdminModule() {
    }
    LacaAdminModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                laca_admin_routing_1.routing,
                forms_1.FormsModule],
            declarations: [
                admin_main_component_1.AdminMainComponent,
                admin_main_template_withmenu_component_1.AdminMainTemplateWithMenuComponent,
                admin_main_template_withoutmenu_component_1.AdminMainTemplateWithoutMenuComponent,
                laca_login_component_1.LacaLoginComponent,
                laca_welcome_component_1.LacaWelcomeComponent,
                config_homepage_component_1.ConfigHomepageComponent,
                config_menu_component_1.ConfigMenuComponent,
                config_wiki_category_component_1.ConfigWikiCategoryComponent,
                config_wiki_category_new_component_1.ConfigWikiCategoryNewComponent,
                config_wiki_article_component_1.ConfigWikiArticleComponent,
                config_wiki_article_new_component_1.ConfigWikiArticleNewComponent,
                laca_table_component_1.LacaTableComponent,
                laca_column_component_1.LacaColumnComponent,
                laca_menu_component_1.LacaMenuComponent,
                laca_menuitem_component_1.LacaMenuItemComponent
            ],
            providers: [
                laca_admin_routing_1.appRoutingProviders,
                authent_authorize_guard_1.AuthentAuthorizeGuard,
                config_menu_service_1.ConfigMenuService,
                config_wiki_service_1.ConfigWikiService,
                admin_main_service_1.AdminMainService,
                config_site_service_1.ConfigSiteService
            ],
            bootstrap: [admin_main_component_1.AdminMainComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], LacaAdminModule);
    return LacaAdminModule;
}());
exports.LacaAdminModule = LacaAdminModule;
//# sourceMappingURL=laca-admin.module.js.map