import { Component, Input, animate, state, style, transition, trigger } from '@angular/core';

import { LacaMenuItem } from './laca-menuitem';

import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    selector: 'laca-menu-item',
    animations: [
      trigger(
        'openClose', [
            state('collapsed, void', style({height: '0px'})),
            state('expanded', style({height: '*'})),
            transition('collapsed => expanded', [animate('200ms ease-in')]),
            transition('expanded => collapsed', [animate('200ms ease-out')])])],
    templateUrl: './_components/laca-menu/laca-menuitem.component.template.html'
})
export class LacaMenuItemComponent {
  /**
   * Constructor with services injections.
   */
  constructor(
    private adminMainService: AdminMainService) {
    }

  @Input()
  lacaMenuItem: LacaMenuItem;

  /**
   * Function when accordion li element is clicked.
   */
  accordionClick() {
    if (this.lacaMenuItem.expandable) {
      this.lacaMenuItem.expanded = ! this.lacaMenuItem.expanded;
    }
  }

  /**
   * Function used by the menuItem component for the state of the animation,
   * thus providing a smooth sliding.
   */
  stateExpression() {
    if (this.lacaMenuItem.expanded) { return "expanded"; } else { return "collapsed"; }
  }

  /**
   * Function to decide if a menu item should appear activated.
   */
   active() {
     if (!this.lacaMenuItem.items || this.lacaMenuItem.items.length<=0) {
       // In case of a leaf.
       return this.lacaMenuItem.expanded;
     } else {
       // In case of an item with subitems.
       //return this.menuItem.expanded;

       if (this.lacaMenuItem.expandable) {
         return this.lacaMenuItem.expanded;
       }
     }
   }
}
