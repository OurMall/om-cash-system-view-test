import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeCajaRoutingModule } from './home-caja-routing.module';
import { HomeCajaComponent } from './home-caja.component';


@NgModule({
  declarations: [
    HomeCajaComponent
  ],
  imports: [
    CommonModule,
    HomeCajaRoutingModule
  ]
})
export class HomeCajaModule { }
