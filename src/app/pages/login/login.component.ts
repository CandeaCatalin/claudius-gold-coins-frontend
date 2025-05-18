import { CommonModule } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { CAPTCHA_KEY, GOOGLE_CLIENT_ID } from '../../data/Constants/Constants';
import { isPlatformBrowser } from '@angular/common';
import { NavigateService } from '../../services/navigate.service';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [RouterModule,CommonModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  captchaKey: string = CAPTCHA_KEY;
  showPassword: boolean = false;

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }
  constructor(private fb: FormBuilder, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object, private navigateService: NavigateService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),this.passwordValidator]],
      recaptcha: ['', Validators.required]
    });
  }

  initializeGoogleSignIn() {
      if (isPlatformBrowser(this.platformId)) {
        google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleCredentialResponse(response)
        });

        google.accounts.id.renderButton(
          document.getElementById("google-signin-button") as HTMLElement,
          {
            theme: 'outline', size: 'large',
            type: 'standard',
          }  // customization attributes
        );
      }
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);

       // You can decode the JWT token here or send it to your backend for verification
       // For demonstration, we'll just log it

       // If using NgZone, ensure any UI updates are run inside Angular's zone
    this.ngZone.run(() => {
         // Update your application state here, e.g., store user info, navigate, etc.
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // this.authService.setToken(this.loginForm.value.email);
      console.log('Form Submitted', this.loginForm.value);
      this.navigateService.navigate("");
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
        passwordStrength: 'Parola trebuie sa aibă minim 6 caractere, să conțină cifră și literă mare'
      };
    }
    return null;
  }

  handleGoogleResponse(response: any) {
    
    console.log('Google Credential:', response);
    const credential = response.credential;
    console.log('Google Credential:', credential);

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goBack(): void {
    this.navigateService.navigate("");
  }

  navigateAndRefresh() {
    this.navigateService.navigateAndRefresh("register");
  }
}
