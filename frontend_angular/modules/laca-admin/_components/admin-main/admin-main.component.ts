import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    selector: 'lacaadmin',
    templateUrl: './_components/admin-main/admin-main.component.template.html'
})
export class AdminMainComponent {
  /**
   * Constructor with services injections.
   */
  constructor(
    private adminMainService: AdminMainService) {
  }
}
