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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './components/tables/tables.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { MatSliderModule } from '@angular/material/slider';;
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MyModuleComponent } from './components/my-module/my-module.component';
import { MmodalComponent } from './components/mmodal';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { PdfComponent } from './components/pdf/pdf.component';
import { Template404Component } from './components/template404/template404.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';



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
    PdfComponent,
    CalculatorComponent,
    MyModuleComponent,
    MmodalComponent,
    Template404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatAutocompleteModule,
    NgxPayPalModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    MyModuleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
