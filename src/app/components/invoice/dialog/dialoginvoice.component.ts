import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Invoice } from "src/app/models/invoice";
import { Product } from "src/app/models/product";
import { InvoiceService } from "src/app/services/ServicesInvoices/invoice.service";
import { ProductsService } from "src/app/services/ServicesProducts/products.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from "rxjs";

@Component({
    templateUrl: 'dialoginvoice.component.html'
})

export class DialogInvoiceComponent {
    public id_client!: string;
    public invoice1!: Invoice;
    public products!: Product[];
    public product!: Product;
    public total_price!: number;
    public payment_method!: string;
    public codeProduct!: string;
    public searhProduct!: Observable<Product>;
    public quantiy!: number;

    public detailsForm = this.formBuilder.group({
        Name: ["", Validators.required],
        Price: [0.0, Validators.required],
        Code: ["", Validators.required]
    })

    constructor(
        public dialogRef: MatDialogRef<DialogInvoiceComponent>,
        private formBuilder: FormBuilder,
        public apliInvoice: InvoiceService,
        public apiProduct: ProductsService,
        public snackBar: MatSnackBar
    ) {
        this.products = [];
        this.invoice1 = {id_client:this.id_client, details: [], total_price:43, payment_method: "C"};
    };
    
    closeDialog() { 
        this.dialogRef.close();
    };

    /*addInvoice() { 
        const invoice: Invoice = { id_client: this.id_client, details: [], total_price: 34};
        this.apliInvoice.postInvoices(invoice).subscribe(response => {
            this.dialogRef.close();
            this.snackBar.open('Factura creada', '', {
                duration: 2000
            })
        });
    };*/

    addProductsToDetails() {

        //this.products.push(this.detailsForm.value);
        this.apiProduct.getProductsByAdi(this.codeProduct).forEach(response => {
            //this.products.push(response);
            console.log(this.products);
        });
    };

    addInvoices() {
        this.invoice1.details = this.products;
        this.apliInvoice.postInvoices(this.invoice1).subscribe(response => {
            this.dialogRef.close();
            this.snackBar.open('Factura creada', '', {
                duration: 2000
            })
        });
    };

    viewProduct() {
        this.apiProduct.getProductsByAdi(this.codeProduct).subscribe(response => {
            console.log(response);
        })
    };

    /*search(id:string) {
        this.searhProduct = this.apiProduct.getProductsByAdi(id);
    };*/
};