import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

const title = 'Claudius Gold Coins SRL';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Acasa | ' + title } },
  {
    path: 'about-us',
    component: AboutComponent,
    data: { title: 'Despre Noi  | ' + title },
  },
  // { path: 'products/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
