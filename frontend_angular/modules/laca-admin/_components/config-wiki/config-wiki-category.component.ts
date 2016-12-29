import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LacaTableComponent } from '../laca-table/laca-table.component';
import { LacaColumnComponent } from '../laca-table/laca-column.component';

import { ConfigWikiCategory } from './config-wiki-category';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-category.component.template.html'
})
export class ConfigWikiCategoryComponent implements OnInit {
  // Model for our component.
  selectedConfigWikiCategories: ConfigWikiCategory[] = [];

  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configWikiService: ConfigWikiService,
    private adminMainService: AdminMainService) {
  }

  /**
   * OnInit method.
   */
  ngOnInit() {
    // Fetch and check site.
    this.adminMainService.fetchAndCheckSite(this.route);

    // Fetch the wiki categories from database.
    this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);
  }

  /**
   * Navigate.
   */
  buttonNavigate(routetoGo: String) {
    this.router.navigate([`${this.adminMainService.site}/${routetoGo}`]);
  }

  /**
   * Navigate.
   */
  buttonNavigateEditCategory() {
    if (this.selectedConfigWikiCategories.length > 0) {
      let idCategoryToNavigateTo = this.selectedConfigWikiCategories[0]._id;
      this.router.navigate([`${this.adminMainService.site}/config-wiki-category/${idCategoryToNavigateTo}/edit`]);
    }
  }
}
