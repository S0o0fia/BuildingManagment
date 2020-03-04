import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddRequestComponent } from '../add-request/add-request.component';
import { Rfi } from 'app/Models/RFI/rfi';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-request-for-inspection',
  templateUrl: './request-for-inspection.component.html',
  styleUrls: ['./request-for-inspection.component.scss']
})
export class RequestForInspectionComponent implements OnInit {

  RFI_tbl1 : GetRFI[] = [];
  RFI_tbl : GetRFI[] = [];
  Item_rfi :NewItemRFI[]=[];
  resultsLength = 0;
  totalRec : number;
  page: number = 1;
  statename : string;
  projectname : string;
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService ,private router:Router, private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.statename = "draft";

    }

    rfidetails(id)
    {
      
     this.router.navigate(['home/table/rfidetails',id]);
      
    }
ngOnInit() {
this.pageTitleService.setTitle(this.projectname +' / '+"طلبات فحص الأعمال  ");

 this.service.getRFI_tbl().subscribe(
   data=> this.RFI_tbl = data,
   err=> console.log(err)
 );



this.totalRec = this.RFI_tbl.length;
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

state(key:string)
{
 this.statename = key;

  
}

}

