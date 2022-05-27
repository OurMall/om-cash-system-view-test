import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MainComponent } from './components/main/main.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { ProductsComponent } from './components/products/products.component';
import { Template404Component } from './components/template404/template404.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch:'full'},  
  { path: 'invoice', component: InvoiceComponent },
  { path: 'T404', component: Template404Component },
  { path: 'pdf', component: PdfComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'home-caja', loadChildren: () => import('./modules/home-caja/home-caja.module').then(m => m.HomeCajaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
