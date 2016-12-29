import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import '../rxjs-operators';

import { ConfigWikiCategory } from '../_components/config-wiki/config-wiki-category';
import { ConfigWikiArticle } from '../_components/config-wiki/config-wiki-article';

import { AdminMainService } from './admin-main.service';

@Injectable()
export class ConfigWikiService {
  // Model.
  configWikiCategories: ConfigWikiCategory[];
  configWikiArticles: ConfigWikiArticle[];
  configWikiInitialized: boolean;

  constructor (
    private http: Http,
    private adminMainService: AdminMainService) {}

  /**
   * Service to get all wiki categories configs and articles for a given site.
   * We use the parallel http call pattern.
   * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
   * and http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
   */
  getConfigWikiCategoriesAndArticles(site: String, forceReload: boolean = false) {
    //
    // Closure to make some order in the categories list.
    //
    let categoryChildOrderClosure = (
        childConfigWikiCategory: ConfigWikiCategory,
        configWikiCategoriesResult: ConfigWikiCategory[],
        allConfigWikiCategories: ConfigWikiCategory[],
        tabbed: String) => {
      // We can push this item.
      let displayParentCategory: String = '';
      if (childConfigWikiCategory.parentCategory) {
        allConfigWikiCategories.forEach((cwc: ConfigWikiCategory) => {
          if (cwc._id == childConfigWikiCategory.parentCategory) {
            displayParentCategory = cwc.name;
          }
        });
      }
      childConfigWikiCategory.display_nameWithTabs = tabbed + ' ' + childConfigWikiCategory.name;
      childConfigWikiCategory.display_parentCategory = displayParentCategory;
      configWikiCategoriesResult.push(childConfigWikiCategory);

      // Now we can treat the children.
      if (childConfigWikiCategory.childrenCategories) {
        childConfigWikiCategory.childrenCategories.forEach((childCategoryId: String) => {
          // We can add this child to the list.
          allConfigWikiCategories.forEach((cwc: ConfigWikiCategory) => {
            if (cwc._id == childCategoryId) {
              // Let's recurse.
              categoryChildOrderClosure(cwc, configWikiCategoriesResult, allConfigWikiCategories, tabbed + '-');
            }
          });
        });
      }
    };

    //
    // Category order closure.
    //
    let categoryOrderClosure = (allConfigWikiCategories: ConfigWikiCategory[]) => {
      let configWikiCategoriesResult: ConfigWikiCategory[] = [];

      // Let's find out categories without any parent category to start with.
      allConfigWikiCategories.forEach((currConfigWikiCategory: ConfigWikiCategory) => {
        if (! currConfigWikiCategory.parentCategory || currConfigWikiCategory.parentCategory == '') {
          categoryChildOrderClosure(currConfigWikiCategory, configWikiCategoriesResult, allConfigWikiCategories, '');
        }
      });

      // Returns.
      return configWikiCategoriesResult;
    }

    //
    // Main treatment method.
    //
    if (! this.configWikiInitialized || forceReload) {
      // Body and headers.
      let headers = new Headers({ 'x-access-token': this.adminMainService.userJwtToken });
      let options = new RequestOptions({ headers: headers });

      // URLs to the web API, for categories and articles.
      let wikiCategoryConfigsUrl = '/api/' + site + '/wiki-categories';
      let wikiArticleConfigsUrl = '/api/' + site + '/wiki-articles';

      // Call the HTTP services in parallel.
      Observable.forkJoin([
        this.http.get(wikiCategoryConfigsUrl, options).map(this.extractData),
        this.http.get(wikiArticleConfigsUrl, options).map(this.extractData)])
      .subscribe(
        forkJoinResult => {
          // Let's register the fetched objects, categories and articles.
          this.configWikiCategories = forkJoinResult[0];
          this.configWikiArticles = forkJoinResult[1];

          // Finally, let's handle specific treatment.
          this.configWikiCategories = categoryOrderClosure(this.configWikiCategories);

          // Let's indicate the init loading is done.
          this.configWikiInitialized = true;
        },
        error => {
          // Handle error.
          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
    }
  }

  /**
   * Service to get all wiki categories configs and articles for a given site.
   * We use the parallel http call pattern.
   * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
   * and http://stackoverflow.com/questions/34104638/how-to-chain-http-calls-in-angular2
   */
  getConfigWikiArticleDetail(articleId: String, callback: (detailedConfigWikiArticle: ConfigWikiArticle) => any) {
    // Let's prepare the requests.
    let headers: Headers = new Headers({
       'x-access-token': this.adminMainService.userJwtToken,
       'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let wikiArticleConfigUrl = '/api/' + this.adminMainService.site + '/wiki-articles/' + articleId;

    // Call the HTTP service.
    this.http.get(wikiArticleConfigUrl, options)
      .map(this.extractData)
      .subscribe(
        resultArticle => {
          // Let's store the result.
          let indexToReplace = 0;
          let index = 0;
          this.configWikiArticles.forEach((articleFromAll: ConfigWikiArticle) => {
            if (articleFromAll._id == articleId) {
              indexToReplace = index;
            }
            index++;
          });

          // Replace.
          this.configWikiArticles[indexToReplace] = resultArticle[0];

          // Call next callback.
          if (callback) {
            callback(resultArticle[0]);
          }
        },
        error => {
          // Handle error.
          console.log(error);

          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
  }

  /**
   * Service to add a wiki article for a given site. We need to update the category as well.
   * Dependent HTTP calls were made :
   * Cf. http://www.syntaxsuccess.com/viewarticle/angular-2.0-and-http
   * But the category update is now done through REST API.
   */
  addConfigWikiArticle(site: String, configWikiArticle: ConfigWikiArticle) {
    // Let's make some adaptation on the element before requesting database.
    configWikiArticle.siteSlug = this.adminMainService.site;
    configWikiArticle.author = this.adminMainService.userLogin;

    // Let's prepare the requests.
    let configWikiArticleJSON = JSON.stringify(configWikiArticle);
    let headers: Headers = new Headers({
       'x-access-token': this.adminMainService.userJwtToken,
       'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let wikiArticleConfigUrl = '/api/' + site + '/wiki-articles';

    // Call the HTTP service.
    this.http.post(wikiArticleConfigUrl, configWikiArticleJSON, options)
      .map(this.extractData)
      .subscribe(
        resultArticle => {
          // Finally let's recall the elements from database to refresh data.
          this.getConfigWikiCategoriesAndArticles(this.adminMainService.site, true);
        },
        error => {
          // Handle error.
          console.log(error);

          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
  }

  /**
   * Service to update a wiki article config.
   */
  updateConfigWikiArticle(wikiArticleConfig: ConfigWikiArticle) {
    // Let's update the article now.
    wikiArticleConfig.siteSlug = this.adminMainService.site;
    let body = JSON.stringify({
      title: wikiArticleConfig.title,
      slug: wikiArticleConfig.slug,
      htmlContent: wikiArticleConfig.htmlContent,
      category: wikiArticleConfig.category
    });
    let headers: Headers = new Headers({
       'x-access-token': this.adminMainService.userJwtToken,
       'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let wikiArticlesConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-articles/' + wikiArticleConfig._id;

    // Call the HTTP service.
    this.http.put(wikiArticlesConfigsUrl, body, options)
      .map(this.extractData)
      .subscribe(
        resultCategory => {
          // Update the elements.
          this.getConfigWikiCategoriesAndArticles(this.adminMainService.site, true);
        },
        error => {
          // Handle error.
          console.log(error);

          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
  }

  /**
   * Service to add a wiki category config for a given site.
   */
  addConfigWikiCategory(wikiCategoryConfig: ConfigWikiCategory) {
    // Let's deal with the main method, compute body and headers.
    wikiCategoryConfig.siteSlug = this.adminMainService.site;
    if (wikiCategoryConfig.parentCategory == '') {
      wikiCategoryConfig.parentCategory = undefined;
    }
    let body = JSON.stringify(wikiCategoryConfig);
    let headers: Headers = new Headers({
       'x-access-token': this.adminMainService.userJwtToken,
       'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let wikiCategoryConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-categories';

    // Call the HTTP service.
    this.http.post(wikiCategoryConfigsUrl, body, options)
      .map(this.extractData)
      .subscribe(
        resultCategory => {
          // Update the elements.
          this.getConfigWikiCategoriesAndArticles(this.adminMainService.site, true);
        },
        error => {
          // Handle error.
          console.log(error);

          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
  }

  /**
   * Service to update a wiki category config.
   */
  updateConfigWikiCategory(wikiCategoryConfig: ConfigWikiCategory) {
    // Let's update the category now.
    wikiCategoryConfig.siteSlug = this.adminMainService.site;
    if (wikiCategoryConfig.parentCategory == '') {
      wikiCategoryConfig.parentCategory = undefined;
    }
    let body = JSON.stringify({
      name: wikiCategoryConfig.name,
      slug: wikiCategoryConfig.slug,
      description: wikiCategoryConfig.description,
      parentCategory: wikiCategoryConfig.parentCategory,
      childrenCategories: wikiCategoryConfig.childrenCategories,
      articlesIds: wikiCategoryConfig.articlesIds
    });
    let headers: Headers = new Headers({
       'x-access-token': this.adminMainService.userJwtToken,
       'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let wikiCategoryConfigsUrl = '/api/' + this.adminMainService.site + '/wiki-categories/' + wikiCategoryConfig._id;

    // Call the HTTP service.
    this.http.put(wikiCategoryConfigsUrl, body, options)
      .map(this.extractData)
      .subscribe(
        resultCategory => {
          // Update the elements.
          this.getConfigWikiCategoriesAndArticles(this.adminMainService.site, true);
        },
        error => {
          // Handle error.
          console.log(error);

          let errorMessage = <any>error;
          this.adminMainService.handleError(errorMessage, false, null);
        });
  }

  /**
   * Function to correctly map data from the HTTP service.
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /**
   * Error handling method.
   */
  private handleError(error: any) {
    let errorJson = error.json();
    let errorMessage = errorJson.message;

    // Log detailed error on console.
    let errMsg = `${error.status} - ${error.statusText} : ${errorMessage}`;
    console.error(errMsg);
    console.error(errorJson);

    // Return simple error to the caller.
    return Observable.throw(errorMessage);
  }
}
