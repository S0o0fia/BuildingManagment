import { Component, OnInit, Inject } from '@angular/core';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rfi } from 'app/Models/RFI/rfi';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';

@Component({
  selector: 'ms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  
  minDate : Date;
  maxDate : Date;
  item_number : string;
  item_name : string;
  qty : number;
  itemDate : NewItemRFI[]=[];
  constructor(   public dialogRef: MatDialogRef<RequestForInspectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rfi,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
    }
  	
    addItem()
    {
      this.itemDate.push({
        item_name : this.item_name , 
        item_number : this.item_number ,
        qty : this.qty
      });
    }

    removeitem(index)
    {
      this.itemDate.splice(index , 1);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
   

    
  }  
}
