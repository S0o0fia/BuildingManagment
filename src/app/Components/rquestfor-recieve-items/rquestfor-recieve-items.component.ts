import { Component, OnInit } from '@angular/core';
import { AddrecieveditemComponent } from '../addrecieveditem/addrecieveditem.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'ms-rquestfor-recieve-items',
  templateUrl: './rquestfor-recieve-items.component.html',
  styleUrls: ['./rquestfor-recieve-items.component.scss']
})
export class RquestforRecieveItemsComponent implements OnInit {
  constructor(
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

   

    }

    Qty_tbl : any ;
ngOnInit() {
this.pageTitleService.setTitle("طلبات تسليم المواد");

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

