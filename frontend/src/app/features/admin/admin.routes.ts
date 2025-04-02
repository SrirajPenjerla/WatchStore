import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: 'orders', loadComponent: () => import('./components/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
  { path: 'products', loadComponent: () => import('./components/admin-products/admin-products.component').then(m => m.AdminProductsComponent) },
  { path: 'products/new', loadComponent: () => import('./components/admin-product-form/admin-product-form.component').then(m => m.AdminProductFormComponent) },
  { path: 'products/:id/edit', loadComponent: () => import('./components/admin-product-form/admin-product-form.component').then(m => m.AdminProductFormComponent) }
]; 