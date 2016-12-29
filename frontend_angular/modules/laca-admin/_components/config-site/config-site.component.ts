import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { AdminMainService }                from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-site/config-site.component.template.html'
})
export class ConfigSiteComponent implements OnInit {
  errorMessage: string;
  mode = 'Observable';

  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private adminMainService: AdminMainService) {
  }

  /**
   * OnInit method.
   */
  ngOnInit() {
    // Get site parameter.
    this.route.params.forEach((params: Params) => {
      // Is this an observable technique ?
      this.adminMainService.site = params['site'];
    });
  }
}
