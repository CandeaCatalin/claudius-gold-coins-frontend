import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CAPTCHA_KEY, GOOGLE_CLIENT_ID } from '../../data/Constants/Constants';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { NavigateService } from '../../services/navigate.service';

declare const google: any;

@Component({
  selector: 'app-register',
  imports: [RouterModule,CommonModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  captchaKey: string = CAPTCHA_KEY;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }
  constructor(private fb: FormBuilder, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object, private navigateService: NavigateService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),this.passwordValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6),this.passwordValidator]],
      recaptcha: ['', Validators.required]
    },{
      validators:this.passwordMatchValidator("password","confirmPassword")
    });
  }

  initializeGoogleSignIn() {
      if (isPlatformBrowser(this.platformId)) {
        google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => this.handleCredentialResponse(response)
        });

        google.accounts.id.renderButton(
          document.getElementById("google-signup-button") as HTMLElement,
          {
            theme: 'outline', size: 'large',
            type: 'standard',
            text: "signup_with"
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
    if (this.registerForm.valid) {
      // this.authService.setToken(this.loginForm.value.email);
      console.log('Form Submitted', this.registerForm.value);
      this.navigateService.navigate("");
    }
  }
  
  passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass = formGroup.get(password)?.value;
      const confirmPass = formGroup.get(confirmPassword)?.value;
  
      if (pass !== confirmPass) {
        formGroup.get(confirmPassword)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        formGroup.get(confirmPassword)?.setErrors(null);
        return null;
      }
    };
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

  navigateAndRefresh() {
    this.navigateService.navigateAndRefresh("login");
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  goBack(): void {
    this.navigateService.navigate("");
  }
}
