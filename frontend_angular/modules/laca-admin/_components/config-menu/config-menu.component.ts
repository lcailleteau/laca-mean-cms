import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ConfigMenu } from './config-menu';
import { ConfigMenuService } from '../../_services/config-menu.service';
import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/config-menu/config-menu.component.template.html'
})
export class ConfigMenuComponent implements OnInit {
  errorMessage: string;
  configMenus: ConfigMenu[];
  mode = 'Observable';

  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private configMenuService: ConfigMenuService,
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

    // Fetch the menu configs from database.
    this.getConfigMenus();
  }

  /**
   * Get config menus.
   */
  private getConfigMenus() {
    this.configMenuService.getConfigMenus(this.adminMainService.site)
      .subscribe(
        configMenus => {
          this.configMenus = configMenus
        },
        error => {
          console.log("Error while fetching config menus :");
          console.log(error);

          this.errorMessage = <any>error;
        })
  }
}
