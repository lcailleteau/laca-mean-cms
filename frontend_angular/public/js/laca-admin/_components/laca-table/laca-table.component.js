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
var LacaTableComponent = (function () {
    function LacaTableComponent() {
        this.columns = [];
        this.selectedRows = [];
        this.selectable = false;
        /**
         * Method to clear the selected rows.
         */
        /*
       clearSelectedRows() {
         this.selectedRows = [];
       }*/
    }
    //selectedElements: any[];
    /*
      @Output() rowsSelectionUpdated = new EventEmitter();
      */
    /**
     * Add column method.
     */
    LacaTableComponent.prototype.addColumn = function (column) {
        this.columns.push(column);
    };
    /**
     * Click event on a specific row.
     */
    LacaTableComponent.prototype.onSelect = function (row) {
        if (this.selectable) {
            // Let's add the row to the list if not present, or remove it otherwise.
            var indexOfRow = this.selectedRows.indexOf(row);
            if (indexOfRow == -1) {
                this.selectedRows.push(row);
            }
            else {
                this.selectedRows.splice(indexOfRow, 1);
            }
        }
    };
    /**
     * Method to find out if a row is selected.
     */
    LacaTableComponent.prototype.isRowSelected = function (row) {
        if (!this.selectable) {
            return false;
        }
        else {
            var indexOfRow = this.selectedRows.indexOf(row);
            return indexOfRow != -1;
        }
    };
    return LacaTableComponent;
}());
__decorate([
    core_1.Input(),
    core_1.Output(),
    __metadata("design:type", Array)
], LacaTableComponent.prototype, "selectedRows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LacaTableComponent.prototype, "dataset", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LacaTableComponent.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LacaTableComponent.prototype, "selectable", void 0);
LacaTableComponent = __decorate([
    core_1.Component({
        selector: 'laca-table',
        templateUrl: './_components/laca-table/laca-table.component.template.html'
    }),
    __metadata("design:paramtypes", [])
], LacaTableComponent);
exports.LacaTableComponent = LacaTableComponent;
//# sourceMappingURL=laca-table.component.js.map