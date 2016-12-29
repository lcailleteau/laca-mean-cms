import { Component, Input } from '@angular/core';

import { LacaTableComponent } from './laca-table.component';

@Component({
    selector: 'laca-column',
    template: ``
})
export class LacaColumnComponent {
  @Input() value: any;
	@Input() header: any;

  constructor(table: LacaTableComponent) {
       table.addColumn(this);
  }
}
