import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Auth interceptor - Request URL:', req.url);
  console.log('Auth interceptor - Token exists:', !!token);

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Auth interceptor - Added token to request');
    return next(cloned);
  }

  console.log('Auth interceptor - No token found, proceeding without authentication');
  return next(req);
}; 