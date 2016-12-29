import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LacaColumnComponent } from './laca-column.component';

@Component({
    selector: 'laca-table',
    templateUrl: './_components/laca-table/laca-table.component.template.html'
})
export class LacaTableComponent {
  columns: LacaColumnComponent[] = [];

  @Input()
  @Output()
  selectedRows: any[] = [];

  @Input() dataset: any;

  @Input() class: String;

  @Input() selectable: boolean = false;

//selectedElements: any[];

/*
  @Output() rowsSelectionUpdated = new EventEmitter();
  */

  /**
   * Add column method.
   */
  addColumn(column: LacaColumnComponent) {
    this.columns.push(column);
  }

  /**
   * Click event on a specific row.
   */
  onSelect(row: any): void {
    if (this.selectable) {
      // Let's add the row to the list if not present, or remove it otherwise.
      let indexOfRow = this.selectedRows.indexOf(row);
      if (indexOfRow == -1) {
        this.selectedRows.push(row);
      } else {
        this.selectedRows.splice(indexOfRow, 1);
      }

      // Inform through event that a modification appened.
      // this.rowsSelectionUpdated.emit(this.selectedRows);
    }
  }

  /**
   * Method to find out if a row is selected.
   */
  isRowSelected(row: any): boolean {
    if (! this.selectable) {
      return false;
    } else {
      let indexOfRow = this.selectedRows.indexOf(row);
      return indexOfRow != -1;
    }
  }

  /**
   * Method to clear the selected rows.
   */
   /*
  clearSelectedRows() {
    this.selectedRows = [];
  }*/
}
