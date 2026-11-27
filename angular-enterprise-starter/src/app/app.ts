import { Component, computed, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Card } from './shared/components/card/card';
import { Loader } from './shared/components/loader/loader';
import { Modal } from './shared/components/modal/modal';
import { DataTable, TableColumn } from './shared/components/data-table/data-table';

interface DemoProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-root',
  imports: [MainLayout, Card, Loader, Modal, DataTable],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  protected readonly isLoading = signal(false);
  protected readonly searchTerm = signal('');
  protected readonly selectedProduct = signal<DemoProduct | null>(null);

  protected readonly products = signal<DemoProduct[]>([
    { id: 1, name: 'Teclado Mecánico', category: 'Periféricos', price: 95000, stock: 12 },
    { id: 2, name: 'Monitor 24" IPS', category: 'Monitores', price: 240000, stock: 5 },
    { id: 3, name: 'Mouse Ergonómico', category: 'Periféricos', price: 110000, stock: 0 },
    { id: 4, name: 'Café en Grano 1kg', category: 'Oficina', price: 32000, stock: 18 },
  ]);

  // Configuración tipada de columnas para nuestra DataTable<DemoProduct>
  protected readonly columns: TableColumn<DemoProduct>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Producto' },
    { key: 'category', label: 'Categoría' },
    {
      key: 'price',
      label: 'Precio',
      format: (row) => `$${row.price.toLocaleString('es-AR')}`,
    },
    {
      key: 'stock',
      label: 'Estado',
      format: (row) => (row.stock > 0 ? `${row.stock} u.` : 'Sin stock'),
    },
  ];

  // COMPUTED: se recalcula automáticamente cada vez que cambia searchTerm() o products()
  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.products();

    return this.products().filter(
      (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term),
    );
  });

  // COMPUTED: deriva si el modal está abierto sin duplicar estado booleano
  protected readonly isModalOpen = computed(() => this.selectedProduct() !== null);

  // COMPUTED: suma total del valor en inventario de los productos filtrados
  protected readonly totalInventoryValue = computed(() =>
    this.filteredProducts().reduce((acc, item) => acc + item.price * item.stock, 0),
  );

  constructor() {
    // EFFECT: abrí F12 -> Console en el navegador para verlo reaccionar al filtrar
    effect(() => {
      console.log(
        `[Signals Effect] Filtro: "${this.searchTerm()}" | Coincidencias: ${this.filteredProducts().length}`,
      );
    });
  }

  protected onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  protected simulateReload(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 900);
  }

  protected openProductDetail(product: DemoProduct): void {
    this.selectedProduct.set(product);
  }

  protected closeModal(): void {
    this.selectedProduct.set(null);
  }
}
