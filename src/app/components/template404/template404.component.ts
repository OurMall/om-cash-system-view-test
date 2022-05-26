import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import 'boxicons'

@Component({
  selector: 'app-template404',
  templateUrl: './template404.component.html',
  styleUrls: ['./template404.component.css']
})
export class Template404Component implements OnInit {

  constructor(private _CargaScripts:CargarScriptsService) 
  {
    _CargaScripts.Carga(["scrollreveal.min","main"]);
   }

  ngOnInit(): void {
  }

  

}
