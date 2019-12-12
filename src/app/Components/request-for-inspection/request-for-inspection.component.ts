import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddRequestComponent } from '../add-request/add-request.component';
import { Rfi } from 'app/Models/RFI/rfi';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';

@Component({
  selector: 'ms-request-for-inspection',
  templateUrl: './request-for-inspection.component.html',
  styleUrls: ['./request-for-inspection.component.scss']
})
export class RequestForInspectionComponent implements OnInit {

  RFI_tbl : Rfi[] = [];
  Item_rfi :NewItemRFI[]=[];
  
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

   

    }

   
ngOnInit() {
this.pageTitleService.setTitle("طلبات فحص الأعمال  ");

 this.service.getRFI_tbl().subscribe(
   data=> this.RFI_tbl = data,
   err=> console.log(err)
 );

 this.service.getItemRFI().subscribe(
  data=> 
 {
  debugger;
     data.forEach(element => {
          this.RFI_tbl.forEach(element1 => {
          
            if(element.rfi_id == element1.id)
            {
             
              element1.item_name = element.name ;
              element1.item_number = element.num ;
              element1.item_qty = element.qty;
            }
          });
     });
  } ,
  err=> console.log(err)


);
  
}

openDialog(): void {
  const dialogRef = this.dialog.open(AddRequestComponent, {
    width: '80%',
    height: '85%'
   
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
}

