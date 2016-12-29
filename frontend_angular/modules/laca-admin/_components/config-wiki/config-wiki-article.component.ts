import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LacaTableComponent } from '../laca-table/laca-table.component';
import { LacaColumnComponent } from '../laca-table/laca-column.component';

import { ConfigWikiArticle } from './config-wiki-article';
import { ConfigWikiCategory } from './config-wiki-category';
import { ConfigWikiService } from '../../_services/config-wiki.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-wiki/config-wiki-article.component.template.html'
})
export class ConfigWikiArticleComponent implements OnInit {
  // Model for our component.
  filteredConfigWikiCategory: String;
  filteredConfigWikiArticles: ConfigWikiArticle[];
  selectedConfigWikiArticles: ConfigWikiArticle[];

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
   * Navigate.
   */
  buttonNavigateEditArticle() {
    if (this.selectedConfigWikiArticles.length > 0) {
      let idArticleToNavigateTo = this.selectedConfigWikiArticles[0]._id;
      this.router.navigate([`${this.adminMainService.site}/config-wiki-article/${idArticleToNavigateTo}/edit`]);
    }
  }

  /**
   * When a category is chosen.
   */
  onCategoryChange(event: any) {
    // Init of the elements.
    this.selectedConfigWikiArticles = new Array();
    this.filteredConfigWikiArticles = new Array();
    this.filteredConfigWikiCategory = event;

    // Let's add the logic to filter articles to display.
    this.configWikiService.configWikiCategories.forEach((configWikiCategory: ConfigWikiCategory) => {
      if (configWikiCategory._id == event) {
        // Now we have found the category, we can go through the list of its articles.
        configWikiCategory.articlesIds.forEach((articleId: String) => {
          this.configWikiService.configWikiArticles.forEach((articleFromAll: ConfigWikiArticle) => {
            if (articleFromAll._id == articleId) {
              // We have found an article member of the category, let's add it.
              this.filteredConfigWikiArticles.push(articleFromAll);
            }
          });
        });
      }
    });
  }
}
