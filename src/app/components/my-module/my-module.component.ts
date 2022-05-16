import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-module',
  templateUrl: './my-module.component.html',
  styleUrls: ['./my-module.component.css']
})
export class MyModuleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MyModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      
    }

  ngOnInit(): void {
  }
  

  save() {
    this.dialogRef.close("Factura creada");

  }

}
