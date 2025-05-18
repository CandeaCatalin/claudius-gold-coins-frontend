import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AmanetComponent } from './pages/amanet/amanet.component';
import { EventsComponent } from './pages/events/events.component';
import { CreateEventComponent } from './pages/events/create-event/create-event.component';
import { NgxEditorModule } from 'ngx-editor';
import { RegisterComponent } from './pages/register/register.component';
import { CreateProductComponent } from './pages/products/create-product/create-product.component';
import { OrdersComponent } from './pages/orders/orders.component';

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
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register  | ' + title },
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
  {
    path: 'claudius-gold-coins-and-amanet-deva',
    component: AmanetComponent,
    data: { title: 'Claudius Gold Coins & Amanet  | ' + title },
  },
  {
    path: 'category/:category',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    data: { renderMode: 'prerender' }
  }, 
  {
    path: 'events',
    component: EventsComponent,
    data: { title: 'Events | ' + title },
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    data: { title: 'Adaugă eveniment | ' + title },
  }, 
  {
    path: 'create-product',
    component: CreateProductComponent,
    data: { title: 'Adaugă produs | ' + title },
  },
   {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Comenzi | ' + title },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        horizontal_rule: 'Horizontal rule',
        format_clear: 'Clear Formatting',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',
        indent: 'Increase Indent',
        outdent: 'Decrease Indent',
        superscript: 'Superscript',
        subscript: 'Subscript',
        undo: 'Undo',
        redo: 'Redo',
    
        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
