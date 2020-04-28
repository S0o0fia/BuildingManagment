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

  boolrole : boolean = false ; 
  role : number;
 
  counttable : any[] = [];
  
  resultsLength = 0;
  totalRec : number;
  page: number = 1;
  statename : string;
  projectname : string;
  public rowSelected : any = -1;
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService ,private router:Router, private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.statename = "draft";
      this.role = +localStorage.getItem('Role');

    }

    countdetails(id)
    {
      
     this.router.navigate(['home/table/countitemdetails',id]);
      
    }
ngOnInit() {
  
  if(this.role == 2)
  {
    this.boolrole = true;
  }

this.pageTitleService.setTitle('قائمة طلبات الحصر ' +' / '+this.projectname);

 this.service.getCount().subscribe(
   data=> {this.counttable = data as any;
   debugger;
  },
   err=> console.log(err)
 );

this.totalRec = this.counttable.length;
}

openCloseRow(id): void {
  this.rowSelected = this.rowSelected == -1 ? id : -1;
  console.log(this.rowSelected);
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

