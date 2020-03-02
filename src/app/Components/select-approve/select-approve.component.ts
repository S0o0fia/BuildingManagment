import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RfidetailsComponent } from '../rfidetails/rfidetails.component';
import { CoreService } from 'app/Service/core/core.service';
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
  com : boolean = false;
  constructor( public dialogRef: MatDialogRef<RfidetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , public service : CoreService)
    {
  
    }
    

    //for disable and enable comment textarea
    enableCommet()
    {
       this.com = true;
    }
    disbleCommet()
    {
      this.com = false;
    }
    
    //when User Click Approve
    onNoClick(): void {
     
       this.service.createConsultantApprove(this.data , this.approve ,this.approve , this.comment).subscribe(
         data=>{
        
           location.reload();
         },
         err=> {
           console.log(err)
         }
       )
    }

    //When User Click Cancel
    close()
    {
     
      this.dialogRef.close(); 
    }
  
  ngOnInit() {
   

  }

}
