import { Component, OnInit } from '@angular/core';
import { CollectTableComponent } from '../collect-table/collect-table.component';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'ms-countdetails',
  templateUrl: './countdetails.component.html',
  styleUrls: ['./countdetails.component.scss']
})
export class CountdetailsComponent implements OnInit {

 
 
  counttable : any[] = [];
  
  resultsLength = 0;
  totalRec : number;
  page: number = 1;
  statename : string;
  
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService ,private router:Router, private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.statename = "draft";

    }

    countdetails(id)
    {
      
     this.router.navigate(['home/table/countitemdetails',id]);
      
    }
ngOnInit() {
this.pageTitleService.setTitle("قائمة طلبات الحصر");

 this.service.getCount().subscribe(
   data=> {this.counttable = data as any;
     console.log(this.counttable);
  },
   err=> console.log(err)
 );



this.totalRec = this.counttable.length;
}

openDialog(): void {
  const dialogRef = this.dialog.open( CollectTableComponent, {
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

