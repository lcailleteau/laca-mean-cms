import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ConfigWikiCategory } from './config-wiki-category';
import { ConfigWikiCategoryComponent } from './config-wiki-category.component';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-category-detail-edit.component.template.html'
})
export class ConfigWikiCategoryDetailEditComponent implements OnInit {
  // Model for our component.
  configWikiCategory: ConfigWikiCategory;

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

    // Fetch the wiki articles from database.
    // this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);

    // Let's find the correct category to edit.
    let categoryId = '';
    this.route.params.forEach((params: Params) => {
      categoryId = params['categoryId'];
    });
    this.configWikiService.configWikiCategories.forEach((currConfigWikiCategory: ConfigWikiCategory) => {
      if (currConfigWikiCategory._id == categoryId) {
        this.configWikiCategory = currConfigWikiCategory;
      }
    });
  }

  /**
   * Navigate.
   */
  buttonNavigate(routetoGo: String) {
    this.router.navigate([`${this.adminMainService.site}/${routetoGo}`]);
  }

  /**
   * OnSubmit method.
   */
  onSubmit() {
    // Let's require the update wiki category component.
    this.configWikiService.updateConfigWikiCategory(this.configWikiCategory);

    // We can navigate back to the list of categories.
    this.router.navigate([this.adminMainService.site + '/config-wiki-category']);
  }
}
