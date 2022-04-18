import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public list!: any[];
  public columns: string[] = ['name']
  constructor(
    private apiProduct: ProductsService
  ) { }

  ngOnInit(): void {
  }

  getInvoices() {
    this.apiProduct.getProducts().subscribe( product => {
      this.list = [product]
    })
  }
}
