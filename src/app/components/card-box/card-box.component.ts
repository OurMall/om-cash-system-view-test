import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Details } from 'src/app/models/details';
import { Invoice } from 'src/app/models/invoice';
import { Product } from 'src/app/models/product';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';
import { MyModuleComponent } from '../my-module/my-module.component';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.css']
})
export class CardBoxComponent implements OnInit {


    public id_client!: string;
    public details!: Details[];
    public total_price!: number;
    public invoice!: Invoice;
    public products!: any[];
    public payment_method!: string;
    public nameProduct!: string;
    public searhProduct!: Observable<Product>;
    public quantity!: number;
    public showProducts!: any[];
    public initialValueVAT!: number; 
  
  
    public detailsForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Price: [0.0, Validators.required],
      Code: ["", Validators.required],
      Quantity: [0, Validators.required]
  })
  
  @ViewChild('quantityDetails') 
    public quantityDetails!: ElementRef;
  
    constructor(
        
        private dialog: MatDialog,
        private apiInvoice: InvoiceService,
        private apiProduct: ProductsService,
        private formBuilder: FormBuilder, 
        public snackBar: MatSnackBar,
  
  
    ) { 
      this.products = [];
      this.invoice = {id_client:this.id_client, details: [], total_price:this.total_price, payment_method: "Nada"};
    };
    
    ngOnInit(): void {
      this.getProducts();
    };
  
    openDialog(): void {
      const dialogRef = this.dialog.open(MyModuleComponent,{
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
      });
    }
    
    getInvoices() {
      this.apiInvoice.getInvoices().subscribe((invoice:any) => {
        this.products = invoice;
      })
    };
  
    selectProduct(nameProduct:string) {
      this.nameProduct = nameProduct;
    };
  
    getProducts() {
      this.apiProduct.getProducts().subscribe((response => {
        try {
          console.log(response,"data");
          this.showProducts = response;
          console.log(this.showProducts);
        } catch (error) {
          console.log("Error al traer productos")
        }
      }));
    };
  
    addProductsToDetails() {
      let product: Product = {
        Name: "",
        Price: 0.0,
        Code: "",
        Quantity: 0,
        Vat: 0.0
      };
      /* ------- Valida que sí se ingrese un código ------- */
      if (this.nameProduct == null || undefined) {
        this.snackBar.open("Por favor ingrese un código de producto") 
        /* ------- Valida que sí se ingrese una cantidad para poder registrar un producto ------- */
      } else if (this.quantity == null || undefined) {
        this.snackBar.open("Por favor ingrese una cantidad para este producto") 
      } else {
        /* ------- Traigo el producto relacionado con el código que se ingresa ------- */
        this.apiProduct.getProductsByAdi(this.nameProduct).subscribe((response => { 
          try {


            
              /*  ------- Asigno los valor que necesito del producto a la variable product ------- */
              const element = response[0];  
              let priceProduct = Math.round((element.price * parseFloat(`${1}.${element.vat}`)))
                product = {
                Name: this.nameProduct,
                Price: priceProduct,
                Code: element.code,
                Quantity: this.quantity,
                Vat:(element.price * parseFloat(`${0}.${element.vat}`))
              };
              this.initialValueVAT = element.vat;
              /* ------- Valida si el producto que se ingresa ya existe en los detalles y en caso de que exista suma la nueva cantidad a la cantidad que ya tenía ------- */
              if (this.products.find(product => product.Name == this.nameProduct)) {
                let index = this.products.findIndex(p => p.Name === this.nameProduct);
                let quantity = this.products[index].Quantity += this.quantity ;
                this.UpdateQuantity(element.code, quantity, this.initialValueVAT);
              } else {
                /* ------- Ingresa los productos a los detalles que va a tener la factura -------*/
                this.products.push(product);
              };
              /* ------- Llamo a la función para que vaya sumando los valores y así obtener el valor total de la factura -------*/
              this.sumPrices();
              //this.calculateVat(element.vat, element.price, this.quantity, element.code);
            } catch (error) {
              
              /* ------- En caso de que no haya un producto con el código que se ingreso salta este mensaje ------- */
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
        this.snackBar.open("Para crear la factura necesita mínimo un producto");
      } else {
        this.apiInvoice.postInvoices(this.invoice).subscribe(response => {
          this.snackBar.open('Factura creada', '', {
              duration: 2000
          });
        });
      };
    };
  
  
    UpdateQuantity(code: String, quantity: string, vat:number) {
      /* ------- Posición del producto que se desea actualizar -------*/
      let index = this.products.findIndex(p => p.Code === code);  
      /* ------- Nuevo valor que se ingresa ------- */
      let newQuantity = parseInt(quantity)  
      /* ------- Se valida si el producto está en la lista y si su cantidad actual es mayor 
      o igual a la que se está ingresando ------- */
      if (index > -1 && this.products[index].Quantity >= newQuantity) {
        /* ------- Se cambia la cantidad que tiene el producto por la nueva ------- */
        this.products[index].Quantity = newQuantity;
        this.subtractPrices(); 
        /* ------- Se llama a la función que se encarga de restar los valores para obtener el total de la factura ------- */
        //this.calculateVat(vat, this.products[index].Price, newQuantity, this.products[index].Code)
      } else if (index > -1 && this.products[index].Quantity <= newQuantity) {
        this.products[index].Quantity = newQuantity;
        /* ------- Se llama a la función que se encarga de sumar los valores para obtener el total de la factura ------- */
        this.sumPrices(); 
        //this.calculateVat(vat, this.products[index].Price, newQuantity, this.products[index].Code)
      };
    };
  
    deleteProductToDetails(code: String) {
      let amountToRemove = 1;
      let index = this.products.findIndex(p => p.Code === code);
      if (index > -1 ) {
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

    recordLocalStorage() {
      let products:any[] = this.products
      localStorage.setItem("id_client", this.id_client);
      localStorage.setItem("product", JSON.stringify(products));
      localStorage.setItem("total_price", this.total_price.toString());
    };
  
    
    /*calculateVat(vat:number, price:number, quantity:number, code:string) {
      let index = this.products.findIndex(p => p.Code == code);
  
      /* ------- Con este valor se va a hallar el precio del producto sin el IVA ------- */
      /*let percentageToDividePrice:string = `${1}.${vat}`;
      let productWithVAT = this.products[index].Price * parseFloat(percentageToDividePrice);
      this.products[index].Vat = productWithVAT
  
  
    };*/
  }