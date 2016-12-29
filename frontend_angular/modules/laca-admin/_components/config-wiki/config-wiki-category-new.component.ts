import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ConfigWikiCategory } from './config-wiki-category';
import { ConfigWikiCategoryComponent } from './config-wiki-category.component';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-category-new.component.template.html'
})
export class ConfigWikiCategoryNewComponent implements OnInit {
  // Model for our component.
  configWikiCategory: ConfigWikiCategory = new ConfigWikiCategory();

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
    this.configWikiService.getConfigWikiCategoriesAndArticles(this.adminMainService.site);
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
    // Let's require the add wiki category component.
    this.configWikiService.addConfigWikiCategory(this.configWikiCategory);

    // We can navigate back to the list of categories.
    this.router.navigate([this.adminMainService.site + '/config-wiki-category']);
  }
}
