import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Details } from 'src/app/models/details';
import { Product } from 'src/app/models/product';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';
import { Invoice } from '../../models/invoice'; 
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public id_client!: string;
  public details!: Details[];
  public total_price!: number;
  public invoice!: Invoice;
  public products!: any[];
  public payment_method!: string;
  public codeProduct!: string;
  public searhProduct!: Observable<Product>;
  public quantity!: number;

  public detailsForm = this.formBuilder.group({
    Name: ["", Validators.required],
    Price: [0.0, Validators.required],
    Code: ["", Validators.required],
    Quantity: [0, Validators.required]
})

@ViewChild('quantityDetails') 
  public quantityDetails!: ElementRef;

  constructor(
      private apiInvoice: InvoiceService,
      private apiProduct: ProductsService,
      private formBuilder: FormBuilder, 
      public snackBar: MatSnackBar,


  ) { 
    this.products = [];
    this.invoice = {id_client:this.id_client, details: [], total_price:this.total_price, payment_method: "Nada"};
  };
  ngOnInit(): void {
    //this.getInvoices();
  }
  
  getInvoices() {
    this.apiInvoice.getInvoices().subscribe((invoice:any) => {
      console.log(invoice, "bd")
      this.products = invoice;
    })
  };

  addProductsToDetails() {
    let product: Product = {
      Name: "",
      Price: 0.0,
      Code: "",
      Quantity: 0
    };
    // Valida que sí se ingrese un código 
    if (this.codeProduct == null || undefined) {
      this.snackBar.open("Por favor ingrese un código de producto") 
    } else if (this.quantity == null || undefined) {
      this.snackBar.open("Por favor ingrese una cantidad para este producto") // Valida que sí se ingrese una cantidad para poder registrar un producto
    } else {
      // Traigo el producto relacionado con el código que se ingresa
      this.apiProduct.getProductsByAdi(this.codeProduct).subscribe((response => { 
        try {
            //  Asigno los valor que necesito del producto a la variable product que es de tipo Product
            const element = response[0];  
              product = {
              Name: element.name,
              Price: element.price,
              Code: this.codeProduct,
              Quantity: this.quantity,
            };
            // Valida si el producto que se ingresa ya existe en los detalles y en caso de que exista suma la nueva cantidad a la cantidad que ya tenía
            if (this.products.find(product => product.Code == this.codeProduct)) {
              let index = this.products.findIndex(p => p.Code === this.codeProduct);
              this.products[index].Quantity += this.quantity ;
            } else {
              this.products.push(product);
            };
            // Llamo a la función para que vaya sumando los valores y así obtener el valor total de la factura
            this.sumPrices();
          } catch (error) {
            
            // En caso de que no haya un producto con el código que se ingreso salta este mensaje
            this.snackBar.open("No hay un producto con éste código");
          };
      }));
    };
  };


  addInvoices() {
    this.invoice.total_price = this.total_price;
    this.invoice.details = this.products;
    /* ------- Valida que si hayan productos en los detalles para poder crear la factura ------- */ 
    if (this.products.length === 0) {
      this.snackBar.open("Para crear la factura necesita minimo un productos");
    } else {
      this.apiInvoice.postInvoices(this.invoice).subscribe(response => {
        this.snackBar.open('Factura creada', '', {
            duration: 2000
        });
      });
    };
  };

  UpdateQuantity(code: String, quantity: string) {
    let index = this.products.findIndex(p => p.Code === code);  // Posición del producto que se desea actualizar 
    let newQuantity = parseInt(quantity)   // Nuevo valor que se desea ingresar 
    
    /* Se valida si el producto está en la lista y si su cantidad actual es mayor 
    o igual a la que se está ingresando */
    if (index > -1 && this.products[index].Quantity >= newQuantity && confirm('¿Desea actualizar la cantidad del producto?')) {

      this.products[index].Quantity = newQuantity; // Se cambia la cantidad que tiene el producto por la nueva
      this.subtractPrices(); // Se llama a la función que se encarga de restar los valores para obtener el total de la factura
    } else if (index > -1 && this.products[index].Quantity <= newQuantity && confirm('¿Desea actualizar la cantidad del producto?')) {
      this.products[index].Quantity = newQuantity;
      this.sumPrices(); // Se llama a la función que se encarga de sumar los valores para obtener el total de la factura
    };
  };


  deleteProductToDetails(code: String) {
    let amountToRemove = 1;
    let index = this.products.findIndex(p => p.Code === code);
    if (index > -1 && confirm('¿Desea eliminar el producto?')) {
      this.products.splice(index, amountToRemove);
      this.subtractPrices();
    };  
  };

  sumPrices() {
    let initialValue = 0;
    this.total_price = this.products.reduce((
      currentValue,
      object,
    ) => currentValue + (object.Price * object.Quantity), initialValue);
  };

  subtractPrices() {
    let initialValue = 0;
    this.total_price = this.products.reduce((
      currentValue,
      object,
    ) => currentValue - (object.Price * object.Quantity) * -1, initialValue);
  };

  /*openAdd() {
    const dialogRef = this.dialog.open(DialogInvoiceComponent, {
      width: '30000',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getInvoices();
    })
  };
  */
}