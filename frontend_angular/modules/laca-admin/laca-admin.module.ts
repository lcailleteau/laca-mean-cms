import { NgModule }  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AdminMainComponent } from './_components/admin-main/admin-main.component';
import { AdminMainTemplateWithMenuComponent } from './_components/admin-main/admin-main-template-withmenu.component';
import { AdminMainTemplateWithoutMenuComponent } from './_components/admin-main/admin-main-template-withoutmenu.component';

import { AdminMainService } from './_services/admin-main.service';

import { LacaCKEditorComponent } from './_components/laca-ckeditor/laca-ckeditor.component';
import { LacaWelcomeComponent } from './_components/laca-welcome/laca-welcome.component';
import { LacaLoginComponent } from './_components/laca-login/laca-login.component';

import { ConfigSiteService } from './_services/config-site.service';

import { ConfigHomepageComponent } from './_components/config-homepage/config-homepage.component';

import { ConfigMenuComponent } from './_components/config-menu/config-menu.component';
import { ConfigMenuService } from './_services/config-menu.service';

import { ConfigWikiCategoryComponent } from './_components/config-wiki/config-wiki-category.component'
import { ConfigWikiCategoryNewComponent } from './_components/config-wiki/config-wiki-category-new.component'
import { ConfigWikiCategoryDetailEditComponent } from './_components/config-wiki/config-wiki-category-detail-edit.component'

import { ConfigWikiArticleComponent } from './_components/config-wiki/config-wiki-article.component';
import { ConfigWikiArticleNewComponent } from './_components/config-wiki/config-wiki-article-new.component';
import { ConfigWikiArticleDetailEditComponent } from './_components/config-wiki/config-wiki-article-detail-edit.component'

import { ConfigWikiService } from './_services/config-wiki.service';

import { LacaTableComponent } from './_components/laca-table/laca-table.component';
import { LacaColumnComponent } from './_components/laca-table/laca-column.component';

import { LacaMenuComponent } from './_components/laca-menu/laca-menu.component';
import { LacaMenuItemComponent } from './_components/laca-menu/laca-menuitem.component';

import { routing, appRoutingProviders } from './laca-admin.routing';

import { AuthentAuthorizeGuard } from './_guards/authent-authorize.guard';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule],
  declarations: [
    AdminMainComponent,
    AdminMainTemplateWithMenuComponent,
    AdminMainTemplateWithoutMenuComponent,
    LacaLoginComponent,
    LacaWelcomeComponent,
    ConfigHomepageComponent,
    ConfigMenuComponent,
    ConfigWikiCategoryComponent,
    ConfigWikiCategoryNewComponent,
    ConfigWikiCategoryDetailEditComponent,
    ConfigWikiArticleComponent,
    ConfigWikiArticleNewComponent,
    ConfigWikiArticleDetailEditComponent,
    LacaTableComponent,
    LacaColumnComponent,
    LacaMenuComponent,
    LacaMenuItemComponent,
    LacaCKEditorComponent
    ],
  providers: [
    appRoutingProviders,
    AuthentAuthorizeGuard,
    ConfigMenuService,
    ConfigWikiService,
    AdminMainService,
    ConfigSiteService

  ],
  bootstrap: [ AdminMainComponent ]
})
export class LacaAdminModule { }
