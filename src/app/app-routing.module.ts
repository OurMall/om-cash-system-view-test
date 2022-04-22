import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch:'full'},
  { path: 'invoice', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'home-caja', loadChildren: () => import('./modules/home-caja/home-caja.module').then(m => m.HomeCajaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
