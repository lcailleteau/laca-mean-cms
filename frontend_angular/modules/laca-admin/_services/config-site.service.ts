import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';

import { Observable }       from 'rxjs/Observable';
import '../rxjs-operators';

import { ConfigSite }       from '../_components/config-site/config-site';

@Injectable()
export class ConfigSiteService {
  /**
   * Constructor.
   */
  constructor (private http: Http) {}

  /**
   * Service to get all config sites.
   */
  getConfigSites(): Observable<ConfigSite[]> {
    // Here we are not having a Promise with a then method, but instead
    // it is an Observable of HTTP responses from the RxJS library.
    // Map is one of RxJS operators.

    // URL to the web API.
    let siteConfigsUrl = '/api/sites';

    // Returns the observable.
    return this.http.get(siteConfigsUrl)
        .map(this.extractData)
        .catch(this.handleError);
  }

  /**
   * Private method to extract data.
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /**
   * Handle error method.
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
