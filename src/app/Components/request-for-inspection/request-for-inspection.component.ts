import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddRequestComponent } from '../add-request/add-request.component';
import { Rfi } from 'app/Models/RFI/rfi';

@Component({
  selector: 'ms-request-for-inspection',
  templateUrl: './request-for-inspection.component.html',
  styleUrls: ['./request-for-inspection.component.scss']
})
export class RequestForInspectionComponent implements OnInit {

  RFI_tbl : Rfi ;
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

   

    }

   
ngOnInit() {
this.pageTitleService.setTitle("طلبات فحص الأعمال  ");
;
 this.service.getRFI_tbl().subscribe(
   data=> this.RFI_tbl = data,
   err=> console.log(err)
 );
   console.log(this.RFI_tbl);
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

