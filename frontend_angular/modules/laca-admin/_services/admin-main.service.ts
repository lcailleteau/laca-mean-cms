import { Injectable } from '@angular/core';
import { Params, Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ConfigSite } from '../_components/config-site/config-site';

import { ConfigSiteService } from './config-site.service';

@Injectable()
export class AdminMainService {
  // Parameters specific to the site, stored inside this main admin service and
  // used throughout all components.

  // The site.
  site: String;
  siteExists: boolean;
  siteDetail: ConfigSite;

  // The user.
  userAuthenticated: boolean;
  userJwtToken: String;
  userLogin: String;
  userEmail: String;
  userRoles: Object[];

  // The error message, and form visibility.
  errorMessage: String;
  errorDisplayComponent: boolean;
  private errorHandleOneMoreJump: boolean;

  // Model.
  configSites: ConfigSite[];

  /**
   * Constructor with services injections.
   */
  constructor(
    private http: Http,
    private router: Router,
    private configSiteService: ConfigSiteService) {
    // Let's subscribe to navigation end in router, in order to
    // reinit the message error before changing the route.
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // Reinit of error message and flag, if no jump required.
        if (! this.errorHandleOneMoreJump) {
          this.errorMessage = '';
          this.errorDisplayComponent = true;
        } else {
          this.errorHandleOneMoreJump = false;
        }
      }
    });
  }

 /**
  * Service to extract the correct site slug from the URL, and check it exists.
  */
  fetchAndCheckSite(activatedRoute: ActivatedRoute) {
    // Get site parameter.
    activatedRoute.params.forEach((params: Params) => {
     // Is this an observable technique ?
     this.site = params['site'];
    });

    // Now comes the time to check that our site exists.
    this.siteExists = false;
    if (! this.configSites) {
      // Let's fetch sites from the database.
      this.configSiteService.getConfigSites()
        .subscribe(
          configSites => {
            this.configSites = configSites;
            this.checkSite();
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.checkSite();
    }
  }

  /**
   * Private function to check site.
   */
  private checkSite() {
    this.configSites.forEach((configSite: ConfigSite) => {
      if (configSite.slug == this.site) {
        this.siteDetail = configSite;
        this.siteExists = true;
      }
    });

    // If the site does not exist, let's  prepare an error message.
    if (! this.siteExists) {
      this.handleError(
        "Le site demandé '" + this.site + "' n'existe pas.",
        false,
        `${this.site}/login`);
    }
  }

  /**
   * Service to handle error message, and possible route to login component or other.
   */
  handleError(errorMessage: String, errorDisplayComponent: boolean, routeToNavigate: String) {
    // Reinit of error message and flag.
    this.errorMessage = errorMessage;
    this.errorDisplayComponent = errorDisplayComponent;
    this.errorHandleOneMoreJump = false;
    if (routeToNavigate) {
      this.router.navigate([routeToNavigate]);
      this.errorHandleOneMoreJump = true;
    }
  }

  /**
   * Login method.
   */
  login(login: String, password: String) {
    // Body and headers.
    let body = JSON.stringify({ login: login, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // URL to the web API.
    let authenticationUrl = '/api/authenticate';

    // Call the HTTP service for authentication.
    this.http.post(authenticationUrl, body, options)
      .map(this.extractData)
      .subscribe(jsonResponse => {
        // Let's register user information.
        this.userAuthenticated = true;
        this.userJwtToken = jsonResponse.token;
        this.userLogin = jsonResponse.login;
        this.userEmail = jsonResponse.email;
        this.userRoles = jsonResponse.roles;

        /*
        // Let's build the data to store in local storage.
        let dataToStore = JSON.stringify(
          {
            authenticated: true,
            token: jsonResponse.token,
            login: jsonResponse.login,
            email: jsonResponse.email,
            roles: jsonResponse.roles
          }
        );

        // Store in local storage.
        localStorage.setItem('currentUser', dataToStore);
        */

        // Let's route to the welcome component.
        this.router.navigate([this.site + '/']);
    },
    error => {
      let currentErrorMessage: String;
      currentErrorMessage = <any>error;
      let errorBodyMessage = error._body;
      if (errorBodyMessage) {
        let jsonError = JSON.parse(errorBodyMessage);
        // console.log("Error while login : ");
        // console.log(jsonError);
        if (jsonError && jsonError.message && jsonError.message.indexOf('User not found') > 0) {
          currentErrorMessage = "Le login n'existe pas.";
        } else if (jsonError && jsonError.message && jsonError.message.indexOf('Wrong password') > 0) {
          currentErrorMessage = "Le mot de passe est incorrect.";
        }
      }

      // Let's deal with the error.
      this.handleError(currentErrorMessage, true, null);
    });
  }

  /**
   * Function to correctly map data from the HTTP service.
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
