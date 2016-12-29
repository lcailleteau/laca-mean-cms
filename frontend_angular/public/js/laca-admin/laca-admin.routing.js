"use strict";
var router_1 = require("@angular/router");
var admin_main_template_withmenu_component_1 = require("./_components/admin-main/admin-main-template-withmenu.component");
var admin_main_template_withoutmenu_component_1 = require("./_components/admin-main/admin-main-template-withoutmenu.component");
var laca_welcome_component_1 = require("./_components/laca-welcome/laca-welcome.component");
var laca_login_component_1 = require("./_components/laca-login/laca-login.component");
var config_menu_component_1 = require("./_components/config-menu/config-menu.component");
var config_wiki_category_component_1 = require("./_components/config-wiki/config-wiki-category.component");
var config_wiki_category_new_component_1 = require("./_components/config-wiki/config-wiki-category-new.component");
var config_wiki_category_detail_edit_component_1 = require("./_components/config-wiki/config-wiki-category-detail-edit.component");
var config_wiki_article_component_1 = require("./_components/config-wiki/config-wiki-article.component");
var config_wiki_article_new_component_1 = require("./_components/config-wiki/config-wiki-article-new.component");
var config_wiki_article_detail_edit_component_1 = require("./_components/config-wiki/config-wiki-article-detail-edit.component");
var authent_authorize_guard_1 = require("./_guards/authent-authorize.guard");
var appRoutes = [
    {
        path: '',
        component: admin_main_template_withmenu_component_1.AdminMainTemplateWithMenuComponent,
        children: [
            {
                path: ':site/config-menu',
                component: config_menu_component_1.ConfigMenuComponent
            },
            {
                path: ':site/config-wiki-category',
                component: config_wiki_category_component_1.ConfigWikiCategoryComponent,
                canActivate: [authent_authorize_guard_1.AuthentAuthorizeGuard],
                data: { roles: ['superadmin', 'admin'] }
            },
            {
                path: ':site/config-wiki-category/new',
                component: config_wiki_category_new_component_1.ConfigWikiCategoryNewComponent
            },
            {
                path: ':site/config-wiki-category/:categoryId/edit',
                component: config_wiki_category_detail_edit_component_1.ConfigWikiCategoryDetailEditComponent
            },
            {
                path: ':site/config-wiki-article',
                component: config_wiki_article_component_1.ConfigWikiArticleComponent,
                canActivate: [authent_authorize_guard_1.AuthentAuthorizeGuard],
                data: { roles: ['superadmin', 'admin'] }
            },
            {
                path: ':site/config-wiki-article/new',
                component: config_wiki_article_new_component_1.ConfigWikiArticleNewComponent
            },
            {
                path: ':site/config-wiki-article/:articleId/edit',
                component: config_wiki_article_detail_edit_component_1.ConfigWikiArticleDetailEditComponent
            }
        ]
    },
    { path: '', component: admin_main_template_withoutmenu_component_1.AdminMainTemplateWithoutMenuComponent, children: [
            { path: ':site/login', component: laca_login_component_1.LacaLoginComponent },
            { path: ':site', component: laca_welcome_component_1.LacaWelcomeComponent }
        ] }
];
/*
const appRoutes: Routes = [
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'crisis-center', component: CrisisCenterComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: {
      title: 'Heroes List'
    }
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];
*/
/*


  { path: '', component: WithMenuTemplateComponent,
      children: [
        { path: ':site/menued', component: BbComponent }
      ]
    },

      { path: '', component: WithoutMenuTemplateComponent,
          children: [
            { path: ':site/login', component: BbComponent }
          ]
        },


*/
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=laca-admin.routing.js.map