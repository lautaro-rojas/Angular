import { Component, input } from '@angular/core';

export type LoaderSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  readonly message = input<string>('Cargando...');
  readonly size = input<LoaderSize>('md');
}