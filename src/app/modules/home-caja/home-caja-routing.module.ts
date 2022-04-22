import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCajaComponent } from './home-caja.component';

const routes: Routes = [{ path: '', component: HomeCajaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeCajaRoutingModule { }
