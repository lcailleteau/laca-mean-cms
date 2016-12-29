import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMainComponent } from './_components/admin-main/admin-main.component'
import { AdminMainTemplateWithMenuComponent }  from './_components/admin-main/admin-main-template-withmenu.component';
import { AdminMainTemplateWithoutMenuComponent }  from './_components/admin-main/admin-main-template-withoutmenu.component';

import { LacaWelcomeComponent } from './_components/laca-welcome/laca-welcome.component';
import { LacaLoginComponent } from './_components/laca-login/laca-login.component';

import { ConfigMenuComponent } from './_components/config-menu/config-menu.component';
import { ConfigWikiCategoryComponent } from './_components/config-wiki/config-wiki-category.component';
import { ConfigWikiCategoryNewComponent } from './_components/config-wiki/config-wiki-category-new.component';
import { ConfigWikiCategoryDetailEditComponent } from './_components/config-wiki/config-wiki-category-detail-edit.component';
import { ConfigWikiArticleComponent } from './_components/config-wiki/config-wiki-article.component';
import { ConfigWikiArticleNewComponent } from './_components/config-wiki/config-wiki-article-new.component';
import { ConfigWikiArticleDetailEditComponent } from './_components/config-wiki/config-wiki-article-detail-edit.component';

import { ConfigHomepageComponent } from './_components/config-homepage/config-homepage.component';

import { AuthentAuthorizeGuard } from './_guards/authent-authorize.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminMainTemplateWithMenuComponent,
      children: [
        {
          path: ':site/config-menu',
          component: ConfigMenuComponent
        },
        {
          path: ':site/config-wiki-category',
          component: ConfigWikiCategoryComponent,
          canActivate: [AuthentAuthorizeGuard],
          data: { roles: ['superadmin', 'admin']}
          //data: { roles: ['reader']}
        },
        {
          path: ':site/config-wiki-category/new',
          component: ConfigWikiCategoryNewComponent
        },
        {
          path: ':site/config-wiki-category/:categoryId/edit',
          component: ConfigWikiCategoryDetailEditComponent
        },
        {
          path: ':site/config-wiki-article',
          component: ConfigWikiArticleComponent,
          canActivate: [AuthentAuthorizeGuard],
          data: { roles: ['superadmin', 'admin']}
          //data: { roles: ['reader']}
        },
        {
          path: ':site/config-wiki-article/new',
          component: ConfigWikiArticleNewComponent
        },
        {
          path: ':site/config-wiki-article/:articleId/edit',
          component: ConfigWikiArticleDetailEditComponent
        }
      ]},
      { path: '', component: AdminMainTemplateWithoutMenuComponent, children: [
    { path: ':site/login', component: LacaLoginComponent },
    { path: ':site', component: LacaWelcomeComponent }
  ]}




/*
  // { path: ':site/login', component: LoginComponent },
  { path: ':site/menu-config', component: MenuConfigComponent },

  { path: ':site/wiki-category-config', component: WikiCategoryConfigComponent, data: {displayMenu: false} },
  { path: ':site/wiki-category-config/new', component: WikiCategoryConfigNewComponent },

  { path: ':site', component: WelcomeComponent },


  { path: 'hero/:id', component: MenuConfigComponent },
  { path: 'crisis-center', component: MenuConfigComponent },
  { path: 'home', component: HomepageConfigComponent },
  {
    path: 'heroes',
    component: MenuConfigComponent,
    data: {
      title: 'Heroes List'
    }
  },
  { path: '', component: MenuConfigComponent },
  { path: '**', component: MenuConfigComponent }
  */
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


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
