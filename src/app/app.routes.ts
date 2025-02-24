import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

const title = 'Claudius Gold Coins SRL';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Acasa | ' + title } },
  {
    path: 'despre-noi',
    component: AboutComponent,
    data: { title: 'Despre Noi  | ' + title },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login  | ' + title },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Coșul meu  | ' + title },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact  | ' + title },
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    data: { title: 'Terms & Conditions  | ' + title },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { title: 'Privacy Policy  | ' + title },
  },
  // { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
