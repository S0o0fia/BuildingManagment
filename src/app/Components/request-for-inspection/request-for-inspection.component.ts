import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddRequestComponent } from '../add-request/add-request.component';
import { Rfi } from 'app/Models/RFI/rfi';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-request-for-inspection',
  templateUrl: './request-for-inspection.component.html',
  styleUrls: ['./request-for-inspection.component.scss'] , 
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
export class RequestForInspectionComponent implements OnInit {

  RFI_tbl1 : GetRFI[] = [];
  RFI_tbl : GetRFI[] = [];
  Item_rfi :NewItemRFI[]=[];
  resultsLength = 0;
  totalRec : number;
  page: number = 1;
  statename : string;
  projectname : string;
  role : number;
  activity : any[]=[];
  boolrole : boolean ;
  
 
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService ,private router:Router, private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.role = +localStorage.getItem('Role');
      //this.statename = "draft";

    }

    rfidetails(id)
    {
      
     this.router.navigate(['home/table/rfidetails',id]);
      
    }
ngOnInit() {
  localStorage.setItem("lastRFI", null);
this.pageTitleService.setTitle(this.projectname +' / '+"طلبات فحص الأعمال  ");

 this.service.getRFI_tbl().subscribe(
   data=> {this.RFI_tbl = data;
    localStorage.setItem("lastRFI", Math.max.apply(Math, this.RFI_tbl.map(function(o) { return o.id; })))
    //alert(localStorage.getItem("lastRFI"));
  console.log(data)
  },
   err=> console.log(err)
 );



this.totalRec = this.RFI_tbl.length;



this.service.getRole(this.role).subscribe(
  data=>{
        this.activity = data[0].activity_ids ;
        console.log(this.activity)
        this.activity.forEach(element => {
           if(element.name == "Create RFI")
           {
             this.boolrole = true;
           }
        });
     } ,
     err=>console.log(err)
  )


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

