import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './modal.css',
})
export class Modal {
  readonly isOpen = input.required<boolean>();
  readonly title = input.required<string>();
  readonly closed = output<void>();

  protected close(): void {
    this.closed.emit();
  }
}
