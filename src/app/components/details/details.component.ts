import { Component, OnInit } from '@angular/core';
import { Details } from 'src/app/models/details';
import { Product } from 'src/app/models/product';
import { DetailsService } from 'src/app/services/ServicesDetails/details.service';
import { callbackify } from 'util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public list!: Product[];
  public columns: string[] = ['name']
  constructor(
    private apiDetails: DetailsService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.apiDetails.getDetail().subscribe( details => {
      console.log(details)
    })
  }
}
