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
var admin_main_service_1 = require("../../_services/admin-main.service");
var AdminMainComponent = (function () {
    /**
     * Constructor with services injections.
     */
    function AdminMainComponent(adminMainService) {
        this.adminMainService = adminMainService;
    }
    return AdminMainComponent;
}());
AdminMainComponent = __decorate([
    core_1.Component({
        selector: 'lacaadmin',
        templateUrl: './_components/admin-main/admin-main.component.template.html'
    }),
    __metadata("design:paramtypes", [admin_main_service_1.AdminMainService])
], AdminMainComponent);
exports.AdminMainComponent = AdminMainComponent;
//# sourceMappingURL=admin-main.component.js.map