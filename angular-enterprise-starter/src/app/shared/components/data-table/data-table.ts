import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  format?: (row: T) => string;
}

@Component({
  selector: 'app-data-table',
  imports: [],
  templateUrl: './data-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './data-table.css',
})
export class DataTable<T extends { id: string | number }> {
  readonly data = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();
  readonly emptyMessage = input<string>('No hay registros para mostrar.');
  readonly rowClick = output<T>();

  protected onRowClick(row: T): void {
    this.rowClick.emit(row);
  }
}
