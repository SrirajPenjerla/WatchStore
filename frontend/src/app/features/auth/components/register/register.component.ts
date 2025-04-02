import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Register</h2>

              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      formControlName="firstName"
                      [class.is-invalid]="firstName?.invalid && firstName?.touched"
                    >
                    <div class="invalid-feedback">
                      First name is required
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      formControlName="lastName"
                      [class.is-invalid]="lastName?.invalid && lastName?.touched"
                    >
                    <div class="invalid-feedback">
                      Last name is required
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      formControlName="email"
                      [class.is-invalid]="email?.invalid && email?.touched"
                    >
                    <div class="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      formControlName="password"
                      [class.is-invalid]="password?.invalid && password?.touched"
                    >
                    <div class="invalid-feedback">
                      Password must be at least 6 characters long
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      formControlName="confirmPassword"
                      [class.is-invalid]="confirmPassword?.invalid && confirmPassword?.touched"
                    >
                    <div class="invalid-feedback">
                      Passwords do not match
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      formControlName="phone"
                      [class.is-invalid]="phone?.invalid && phone?.touched"
                    >
                    <div class="invalid-feedback">
                      Phone number is required
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      formControlName="address"
                      [class.is-invalid]="address?.invalid && address?.touched"
                    >
                    <div class="invalid-feedback">
                      Address is required
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="city" class="form-label">City</label>
                    <input
                      type="text"
                      class="form-control"
                      id="city"
                      formControlName="city"
                      [class.is-invalid]="city?.invalid && city?.touched"
                    >
                    <div class="invalid-feedback">
                      City is required
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="state" class="form-label">State</label>
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      formControlName="state"
                      [class.is-invalid]="state?.invalid && state?.touched"
                    >
                    <div class="invalid-feedback">
                      State is required
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="postalCode" class="form-label">Postal Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="postalCode"
                      formControlName="postalCode"
                      [class.is-invalid]="postalCode?.invalid && postalCode?.touched"
                    >
                    <div class="invalid-feedback">
                      Postal code is required
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="country" class="form-label">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="country"
                      formControlName="country"
                      [class.is-invalid]="country?.invalid && country?.touched"
                    >
                    <div class="invalid-feedback">
                      Country is required
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="d-grid">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        [disabled]="registerForm.invalid || isLoading"
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                          *ngIf="isLoading"
                        ></span>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div class="text-center mt-3">
                <p class="mb-0">
                  Already have an account?
                  <a routerLink="/auth/login">Login</a>
                </p>
              </div>

              <div *ngIf="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding-top: 100px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 2rem 0;
      background-color: #f8f9fa;
    }
    .card {
      border-radius: 10px;
      border: none;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .form-control {
      border-radius: 5px;
      padding: 0.75rem;
      border: 1px solid #ced4da;
    }
    .form-control:focus {
      border-color: #86b7fe;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    .btn-primary {
      border-radius: 5px;
      font-weight: 500;
      padding: 0.75rem;
    }
    .invalid-feedback {
      font-size: 0.875rem;
    }
    .form-label {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .alert {
      border-radius: 5px;
    }
    a {
      color: #0d6efd;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = null;
      const formData = this.registerForm.value;
      delete formData.confirmPassword;
      
      this.authService.register(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastService.success('Registration successful');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err;
          this.toastService.error(err);
        }
      });
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address'); }
  get city() { return this.registerForm.get('city'); }
  get state() { return this.registerForm.get('state'); }
  get postalCode() { return this.registerForm.get('postalCode'); }
  get country() { return this.registerForm.get('country'); }
} 