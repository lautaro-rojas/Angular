import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.css',
})
export class Card {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
}
