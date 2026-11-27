import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  imports: [],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-layout.css',
})
export class MainLayout {
  // Propiedades estáticas (no cambian en ejecución)
  protected readonly appName = 'Enterprise Starter';
  protected readonly currentYear = new Date().getFullYear();

  // Estado reactivo (Signal): controla si el sidebar está colapsado o abierto
  protected readonly isSidebarCollapsed = signal(false);

  // Estado reactivo: simula la sección seleccionada (en el Módulo 4 lo reemplazará el Router)
  protected readonly activeSection = signal('Dashboard');

  protected toggleSidebar(): void {
    // .update() recibe el valor anterior y devuelve el nuevo
    this.isSidebarCollapsed.update((collapsed) => !collapsed);
  }

  protected selectSection(section: string): void {
    this.activeSection.set(section);
  }
}
