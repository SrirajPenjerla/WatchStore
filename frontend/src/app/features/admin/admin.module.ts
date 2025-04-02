import { Routes } from '@angular/router';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';

export const routes: Routes = [
  { path: 'orders', component: AdminOrdersComponent },
  { path: 'products', component: AdminProductsComponent },
  { path: 'products/new', component: AdminProductFormComponent },
  { path: 'products/:id/edit', component: AdminProductFormComponent }
]; 