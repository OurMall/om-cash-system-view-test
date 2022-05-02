import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { Invoice } from '../../models/invoice'; 
import { DialogInvoiceComponent } from './dialog/dialoginvoice.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from 'src/app/models/product';
import { Details } from 'src/app/models/details';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



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

  constructor(
      private apiInvoice: InvoiceService,
      private apiProduct: ProductsService,
      public dialog: MatDialog,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogInvoiceComponent>,
      public snackBar: MatSnackBar

  ) { 
    this.products = [];
    this.invoice1 = {id_client:this.id_client, details: [], total_price:43, payment_method: "C"};
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
    console.log("click")
    let product: Product = {
      Name: "",
      Price: 0.0,
      Code: "",
      Quantity: 0
    };
    //this.products.push(this.detailsForm.value);
    this.apiProduct.getProductsByAdi(this.codeProduct).subscribe((response => {
      const element = response[0];  
      console.log(response,"data") 
          product = {
          Name: element.name,
          Price: element.price,
          Code: this.codeProduct,
          Quantity: this.quantity
        };
        this.products.push(product);
        //this.products = response; y se cambia el products.services por listas
        console.log(this.products)
    }));

    /*
    this.apiProduct.getProductsByAdi(this.codeProduct).pipe(
      mergeMap(data => {
        this.products = data;
        data.forEach((current: any) => {
          this.products.push(current);
        });
        return forkJoin(this.products);
      })
    ).subscribe((response:any) =>{
      this.products = response;
    });*/

};

objectKeys(object: any) {
  const keys = Object.keys(object);
  return keys;
}

  addInvoices() {
    this.invoice1.details = this.products;
    this.apiInvoice.postInvoices(this.invoice1).subscribe(response => {
        this.snackBar.open('Factura creada', '', {
            duration: 2000
        })
    });
};

  openAdd() {
    const dialogRef = this.dialog.open(DialogInvoiceComponent, {
      width: '30000',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getInvoices();
    })
  };

  public downloadPDF() {
    const document = new jsPDF();

    document.text('Le embuto la monda', 10, 10);
    document.save('le embuto la monda.pdf');
  }
}