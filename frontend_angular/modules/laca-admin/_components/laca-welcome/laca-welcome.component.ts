import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/laca-welcome/laca-welcome.component.template.html',
})
export class LacaWelcomeComponent implements OnInit {
  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminMainService: AdminMainService) {
  }

  /**
   * OnInit method.
   */
  ngOnInit() {
    // Fetch and check site.
    this.adminMainService.fetchAndCheckSite(this.route);
  }

  /**
   * Navigate.
   */
   buttonNavigate(routetoGo: String) {
     this.router.navigate([`${this.adminMainService.site}/${routetoGo}`]);
   }
}
