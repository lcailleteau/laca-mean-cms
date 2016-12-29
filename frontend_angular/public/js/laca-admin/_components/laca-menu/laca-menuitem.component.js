"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var laca_menuitem_1 = require("./laca-menuitem");
var admin_main_service_1 = require("../../_services/admin-main.service");
var LacaMenuItemComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function LacaMenuItemComponent(adminMainService) {
        this.adminMainService = adminMainService;
    }
    /**
     * Function when accordion li element is clicked.
     */
    LacaMenuItemComponent.prototype.accordionClick = function () {
        if (this.lacaMenuItem.expandable) {
            this.lacaMenuItem.expanded = !this.lacaMenuItem.expanded;
        }
    };
    /**
     * Function used by the menuItem component for the state of the animation,
     * thus providing a smooth sliding.
     */
    LacaMenuItemComponent.prototype.stateExpression = function () {
        if (this.lacaMenuItem.expanded) {
            return "expanded";
        }
        else {
            return "collapsed";
        }
    };
    /**
     * Function to decide if a menu item should appear activated.
     */
    LacaMenuItemComponent.prototype.active = function () {
        if (!this.lacaMenuItem.items || this.lacaMenuItem.items.length <= 0) {
            // In case of a leaf.
            return this.lacaMenuItem.expanded;
        }
        else {
            // In case of an item with subitems.
            //return this.menuItem.expanded;
            if (this.lacaMenuItem.expandable) {
                return this.lacaMenuItem.expanded;
            }
        }
    };
    return LacaMenuItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", laca_menuitem_1.LacaMenuItem)
], LacaMenuItemComponent.prototype, "lacaMenuItem", void 0);
LacaMenuItemComponent = __decorate([
    core_1.Component({
        selector: 'laca-menu-item',
        animations: [
            core_1.trigger('openClose', [
                core_1.state('collapsed, void', core_1.style({ height: '0px' })),
                core_1.state('expanded', core_1.style({ height: '*' })),
                core_1.transition('collapsed => expanded', [core_1.animate('200ms ease-in')]),
                core_1.transition('expanded => collapsed', [core_1.animate('200ms ease-out')])
            ])
        ],
        templateUrl: './_components/laca-menu/laca-menuitem.component.template.html'
    }),
    __metadata("design:paramtypes", [admin_main_service_1.AdminMainService])
], LacaMenuItemComponent);
exports.LacaMenuItemComponent = LacaMenuItemComponent;
//# sourceMappingURL=laca-menuitem.component.js.map