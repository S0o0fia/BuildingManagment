import { Component, OnInit } from '@angular/core';
import { AddrecieveditemComponent } from '../addrecieveditem/addrecieveditem.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-rquestfor-recieve-items',
  templateUrl: './rquestfor-recieve-items.component.html',
  styleUrls: ['./rquestfor-recieve-items.component.scss']
})
export class RquestforRecieveItemsComponent implements OnInit {
  getMIR : any = [];
  constructor(public service : CoreService, public router : Router,
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

   

    }

  mirdetails(id)
    {      
     this.router.navigate(['home/table/mirdetails',id]);
    }

    Qty_tbl : any ;
ngOnInit() {
this.pageTitleService.setTitle("طلبات تسليم المواد");
this.service.getMIR().subscribe(
  data=>this.getMIR=data,
  err=>console.log(err) 
);

}

openDialog(): void {
  const dialogRef = this.dialog.open(AddrecieveditemComponent, {
    width: '80%',
    height: '80%'
   
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
}

