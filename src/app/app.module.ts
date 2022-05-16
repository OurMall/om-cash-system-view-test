import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavsliderComponent } from './shared/navslider/navslider.component';
import { CardBoxComponent } from './components/card-box/card-box.component';
import {CardModule} from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './components/tables/tables.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { MatSliderModule } from '@angular/material/slider';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DialogModule} from 'primeng/dialog';
import { MyModuleComponent } from './components/my-module/my-module.component';






@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    ProductsComponent,
    FooterComponent,
    MainComponent,
    DetailsComponent,
    NavbarComponent,
    NavsliderComponent,
    CardBoxComponent,
    TablesComponent,
    CalculatorComponent,
    MyModuleComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    CardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule, 
    ReactiveFormsModule,
    AutoCompleteModule,
    MatSliderModule,
    DialogModule,
    MatAutocompleteModule



  ],
  entryComponents: [
    MyModuleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
