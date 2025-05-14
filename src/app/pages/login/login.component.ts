import { CartService } from './../../services/cart.service';
import { JwtDecoderService } from './../../services/jwt-decoder.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { CAPTCHA_KEY, GOOGLE_CLIENT_ID } from '../../data/Constants/Constants';
import { isPlatformBrowser } from '@angular/common';
import { NavigateService } from '../../services/navigate.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { HttpRequestsService } from '../../services/http-requests.service';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  captchaKey: string = CAPTCHA_KEY;
  showPassword: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private jwtDecoderService: JwtDecoderService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object,
    private navigateService: NavigateService,
    private httpRequestsService: HttpRequestsService,
    private sessionStorageService: SessionStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), this.passwordValidator],
      ],
      recaptcha: ['', Validators.required],
    });
    const token = this.sessionStorageService.getItem('token');
    if (token != null) {
      this.navigateService.navigate('');
    }
  }

  ngOnInit(): void {
    this.initializeGoogleSignIn();
    const token = this.sessionStorageService.getItem('token');
    if (token != null) {
      this.navigateService.navigate('');
    }
  }

  initializeGoogleSignIn() {
    if (isPlatformBrowser(this.platformId)) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleCredentialResponse(response),
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button') as HTMLElement,
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
        } // customization attributes
      );
    }
  }

  async handleCredentialResponse(response: any) {
    var tokenBody = this.jwtDecoderService.decodeToken(response.credential);

    const body = {
      email: tokenBody.email,
      sub: tokenBody.sub,
    };

    this.subscriptions.push(
      await this.httpRequestsService
        .post('auth/signinwithgoogle', body)
        .subscribe({
          next: (response: any) => {
            this.sessionStorageService.setItem('token', response.access_token);
            this.cartService.mergeCarts();
            this.navigateService.navigate('');
          },
          error: (err) => console.error('Login failed', err),
        })
    );
    this.ngZone.run(() => {
      // Update your application state here, e.g., store user info, navigate, etc.
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.subscriptions.push(
        this.httpRequestsService.post('auth/signin', body).subscribe({
          next: (response: any) => {
            this.sessionStorageService.setItem('token', response.access_token);
            this.cartService.mergeCarts();
            this.navigateService.navigate('');
          },
          error: (err) => console.error('Login failed', err),
        })
      );
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValidLength = value.length >= 6;

    if (!hasUpperCase || !hasNumber || !isValidLength) {
      return {
        passwordStrength:
          'Parola trebuie sa aibă minim 6 caractere, să conțină cifră și literă mare',
      };
    }
    return null;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goBack(): void {
    this.navigateService.navigate('');
  }

  navigateAndRefresh() {
    this.navigateService.navigateAndRefresh('register');
  }
}
