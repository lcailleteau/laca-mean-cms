import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ConfigWikiArticle } from './config-wiki-article';
import { ConfigWikiArticleComponent } from './config-wiki-article.component';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-article-new.component.template.html'
})
export class ConfigWikiArticleNewComponent implements OnInit {
  // Model for our component.
  configWikiArticle: ConfigWikiArticle = new ConfigWikiArticle();

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
    // Let's add the article.
    this.configWikiService.addConfigWikiArticle(
      this.adminMainService.site,
      this.configWikiArticle);

    // We can navigate back to the list of articles.
    this.router.navigate([this.adminMainService.site + '/config-wiki-article']);
  }
}
