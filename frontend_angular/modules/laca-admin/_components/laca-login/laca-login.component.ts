import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AdminMainService } from '../../_services/admin-main.service';
import { ConfigSiteService } from '../../_services/config-site.service';
import { ConfigSite } from '../config-site/config-site';

import { Injectable } from '@angular/core';

@Component({
    templateUrl: './_components/laca-login/laca-login.component.template.html'
})
export class LacaLoginComponent implements OnInit {
  // Model for our component.
  login: String;
  password: String;

  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminMainService: AdminMainService,
    private configSiteService: ConfigSiteService) {
  }

  /**
   * OnInit method.
   */
  ngOnInit() {
    // Fetch and check site.
    this.adminMainService.fetchAndCheckSite(this.route);
  }

  /**
   * OnSubmit method.
   */
  onSubmit() {
    // Let's authenticate, and check roles.
    this.adminMainService.login(this.login, this.password);
  }
}
