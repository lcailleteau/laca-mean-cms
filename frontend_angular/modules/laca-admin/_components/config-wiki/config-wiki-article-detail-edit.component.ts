import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ConfigWikiArticle } from './config-wiki-article';
import { ConfigWikiArticleComponent } from './config-wiki-article.component';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-article-detail-edit.component.template.html'
})
export class ConfigWikiArticleDetailEditComponent implements OnInit {
  // Model for our component.
  configWikiArticle: ConfigWikiArticle;

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

    // Let's find the correct article to edit.
    let articleId = '';
    this.route.params.forEach((params: Params) => {
      articleId = params['articleId'];
    });

    // Even if the article may noy be complete yet, because of a missing
    // htmlContent part, we need to fill it for a display in the component.
    // The html content will be synchronized later.
    this.configWikiService.configWikiArticles.forEach((currConfigWikiArticle: ConfigWikiArticle) => {
      if (currConfigWikiArticle._id == articleId) {
        this.configWikiArticle = currConfigWikiArticle;
      }
    });

    // Besides of the search of the element to display, we need to get the html content of the article.
    this.configWikiService.getConfigWikiArticleDetail(articleId, (detailedConfigWikiArticle: ConfigWikiArticle) => {
      this.configWikiArticle = detailedConfigWikiArticle;
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
    // Let's add the article.
    this.configWikiService.updateConfigWikiArticle(this.configWikiArticle);

    // We can navigate back to the list of articles.
    this.router.navigate([this.adminMainService.site + '/config-wiki-article']);
  }
}
