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
   
  constructor( public dialogRef: MatDialogRef<RfidetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string)
    {
      
      
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    
    }
  
  ngOnInit() {
 
  }

}
