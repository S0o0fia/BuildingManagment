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
   projectname : string;
  statename: string;
  role : number;
  boolrole : boolean = false;
  constructor(public service : CoreService, public router : Router,
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.role = +localStorage.getItem('Role');
   

    }

  mirdetails(id)
    {      
     this.router.navigate(['home/table/mirdetails',id]);
    }

    Qty_tbl : any ;
ngOnInit() {
  debugger;
this.pageTitleService.setTitle(this.projectname +' / '+"طلبات تسليم المواد");
this.service.getMIR().subscribe(
  data=>{
    this.getMIR=data ; 
    console.log(data);
  },
  err=>console.log(err) 
);
   if(this.role == 2)
   {
     this.boolrole  = true;
   }
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

state(key:string)
{
  debugger;
 this.statename = key;

  
}
}

