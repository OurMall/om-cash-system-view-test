import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Details } from 'src/app/models/details';
import { Product } from 'src/app/models/product';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';
import { Invoice } from '../../models/invoice'; 


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public id_client!: string;
  public details!: Details[];
  public total_price!: number;
  public invoice1!: Invoice;
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
      public snackBar: MatSnackBar

  ) { 
    this.products = [];
    this.invoice1 = {id_client:this.id_client, details: [], total_price:this.total_price, payment_method: "Nada"};
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
    // Valido que si se ingrese un código y en caso de que no se ingrese salta este mensaje
    if (this.codeProduct == null || undefined) {
      this.snackBar.open("Por favor ingrese un código de producto") 
    } else if (this.quantity == null || undefined) {
      this.snackBar.open("Por favor ingrese una cantidad para este producto") // Valido que si se ingrese una cantidad para poder registrar un producto
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
              Quantity: this.quantity
              
            };

            3
            // Ingresa el producto a la lista
            this.products.push(product);
          
            // Ingreso el producto al cual se le asignaron los valores
            console.log(this.products);

            // Llamo a la función para que vaya sumando los valores y así optener el valor total de la factura
            this.sumPrices();
          } catch (error) {
            
            // En caso de que no haya un producto con el código que se ingreso salta este mensaje
            this.snackBar.open("No hay un producto con éste código");
          };
      }));
    };
  };


objectKeys(object: any) {
  const keys = Object.keys(object);
  return keys;
}

addInvoices() {
  this.invoice1.total_price = this.total_price;
  this.invoice1.details = this.products;
  if (this.products.length === 0) {
    this.snackBar.open("Para crear la factura necesita minimo un productos");
  } else {
    this.apiInvoice.postInvoices(this.invoice1).subscribe(response => {
      this.snackBar.open('Factura creada', '', {
          duration: 2000
      })
  });
};

}

UpdateQuantity(code: String, quantity: string) {
  let index = this.products.findIndex(p => p.Code === code);
  console.log(index);
  //let value = this.quantityDetails.nativeElement.value;
  //let quantity = parseInt(value);
  let newQuantity = parseInt(quantity)
  console.log(newQuantity);
  if (index > -1 && this.products[index].Quantity >= newQuantity) {
    this.products[index].Quantity = newQuantity;
    this.subtractPrices();
  } else if (index > -1 && this.products[index].Quantity <= newQuantity) {
    this.products[index].Quantity = newQuantity;
    this.sumPrices();
  };
};

/*
UpdateQuantity(code: String) {
  const value = document.querySelector('#newQuantity')?.textContent;
  let quantity = value;
  let index = this.products.findIndex(p => p.Code === code);
  this.products[index].Quantity = quantity;
  console.log(this.products);
};
*/



deleteProductToDetails(code: String) {
  let amountToRemove = 1;
  let index = this.products.findIndex(p => p.Code === code);
  if (index > -1 && confirm('¿Desea eliminar el producto?')) {
    this.products.splice(index, amountToRemove);
    this.subtractPrices();
  }
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

openDialog() {
  
};

};





