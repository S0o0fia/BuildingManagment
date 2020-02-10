import { Component, OnInit, Inject } from '@angular/core';
import { RfidetailsComponent } from '../rfidetails/rfidetails.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ms-edit-contracted-qunatity',
  templateUrl: './edit-contracted-qunatity.component.html',
  styleUrls: ['./edit-contracted-qunatity.component.scss']
})
export class EditContractedQunatityComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<RfidetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public qunatity : number
     ) 
    {
          
    }

  onNoClick(val): void {
    this.qunatity = val;
    this.dialogRef.close( this.qunatity);
  }

   
  

  ngOnInit() {
    console.log(this.qunatity);

    
  }

}
