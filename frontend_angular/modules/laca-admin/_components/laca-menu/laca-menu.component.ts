import { Component, Input } from '@angular/core';

import { LacaMenuItem } from './laca-menuitem';

@Component({
    selector: 'laca-menu',
    templateUrl: './_components/laca-menu/laca-menu.component.template.html',
})
export class LacaMenuComponent {
  @Input()
  name: String;

  @Input()
  lacaMenuItems: LacaMenuItem[];
}
