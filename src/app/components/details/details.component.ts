import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from 'src/app/models/details';
import { DetailsService } from 'src/app/services/ServicesDetails/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public list!: any[];
  public columns: string[] = ['name']
  details$: Observable<any[]> = this.apiDetails.detailsObservable$;

  constructor(
    private apiDetails: DetailsService
  ) { }

  ngOnInit(): void {
    this.apiDetails.getDetail().subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
