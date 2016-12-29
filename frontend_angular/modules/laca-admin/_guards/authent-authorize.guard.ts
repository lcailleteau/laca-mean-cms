import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AdminMainService } from '../_services/admin-main.service';

@Injectable()
export class AuthentAuthorizeGuard implements CanActivate {

  constructor(
    private router: Router,
    private adminMainService: AdminMainService,) {
  }

  /**
   * The canActivate method.
   */
  canActivate(route: ActivatedRouteSnapshot) {
    // First of all, let's check the authentication.
    // if (! localStorage.getItem('currentUser')) {
    if (! this.adminMainService.userAuthenticated) {
      console.log('GUARD : no authentication...');

      // If no authentication, let' route to the login page.
      this.adminMainService.errorMessage = "Vous n'êtes plus connecté, veuillez saisir vos identifiants";
      this.adminMainService.errorDisplayComponent = true;
      this.router.navigate([route.params['site'] + '/login']);
      return false;
    }

    // Ok, we are connected, let's check the roles now.
    let rolesFromLoggedUser = this.adminMainService.userRoles;
    let rolesExpectedByRoute = route.data['roles'];
    let allow = false;
    rolesFromLoggedUser.forEach((roleFromLoggedUserObj: any) => {
      let roleFromLoggedUser = roleFromLoggedUserObj.type;

      // We need to check if this specific role is allowed by the route.
      rolesExpectedByRoute.forEach((roleFromRoute: any) => {
        if (roleFromRoute == roleFromLoggedUser) {
          allow = true;
        }
      });
    });

    // Let's make the routing.
    if (! allow) {
      this.adminMainService.errorMessage = "Vous ne disposez pas des autorisations nécessaires pour accéder à cet écran.";
      this.adminMainService.errorDisplayComponent = true;
      // this.router.navigate([route.params['site'] + '/login']);
      return false;
    }

    // If every check went fine, let's allow the connection.
    return true;
  }
}
