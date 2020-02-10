import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RfidetailsComponent } from '../rfidetails/rfidetails.component';
export interface approveData {
  state : string;
}

@Component({
  selector: 'ms-select-approve',
  templateUrl: './select-approve.component.html',
  styleUrls: ['./select-approve.component.scss']
})
export class SelectApproveComponent implements OnInit {
   
  comment :string ; 
  approve :string;
  constructor( public dialogRef: MatDialogRef<RfidetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      
    
     
    }
    
    
    onNoClick(): void {
     
     this.data  = {
        approve : this.approve , 
        comment : this.comment
      } 
      this.dialogRef.close();
    }
  
  ngOnInit() {
 
  }

}
