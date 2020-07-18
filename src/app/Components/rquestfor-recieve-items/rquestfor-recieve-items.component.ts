import { Component, OnInit } from '@angular/core';
import { AddrecieveditemComponent } from '../addrecieveditem/addrecieveditem.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-rquestfor-recieve-items',
  templateUrl: './rquestfor-recieve-items.component.html',
  styleUrls: ['./rquestfor-recieve-items.component.scss'] , 
  animations:[
   
    trigger('tabletoggle' , [
      transition(':enter', [
        style({ opacity: 0 }), animate('1000ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('1000ms', style({ opacity: 0 }))]
      )
    ]) 
    
  ] 
})
export class RquestforRecieveItemsComponent implements OnInit {
  getMIR : any = [];
   projectname : string;
  statename: string;
  role : number;
  activity : any[]=[];
  Qty_tbl : any ;
  camcreate : boolean = false;
  constructor(public service : CoreService, public router : Router,
    private pageTitleService: PageTitleService , private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.role = +localStorage.getItem('Role');
   

    }
       
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

this.service.getRole(this.role).subscribe(
  data=>{
    this.activity = data[0].activity_ids;
    this.activity.forEach(element => {
      if(element.name == "create-mir")
      {
        this.camcreate = true;
      }
      
    });
  }
)



}


  mirdetails(id)
    {      
     this.router.navigate(['home/table/mirdetails',id]);
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

