import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';

@Component({
  selector: 'ms-add-extract',
  templateUrl: './add-extract.component.html',
  styleUrls: ['./add-extract.component.scss']
})
export class AddExtractComponent implements OnInit {
  minDate : Date;
  maxDate : Date;
  constructor( private dialog: MatDialog) { 

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

 
     this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
  }

  ngOnInit() {
  }

  openDialogItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '75%',
      height: '70%'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


  openDialogDiscount(): void {
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      width: '70%',
      height: '70%'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
