import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.routes)
  },
  { 
    path: 'products', 
    loadChildren: () => import('./features/products/products.module').then(m => m.routes)
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./features/cart/cart.module').then(m => m.routes)
  },
  { 
    path: 'checkout', 
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  { 
    path: 'orders', 
    loadChildren: () => import('./features/orders/orders.module').then(m => m.routes),
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.module').then(m => m.routes),
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./features/profile/profile.module').then(m => m.routes),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/products' }
]; 