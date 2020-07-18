import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { Rfi } from 'app/Models/RFI/rfi';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';
import { ProjectitemsComponent } from '../projectitems/projectitems.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-projectitemslist',
  templateUrl: './projectitemslist.component.html',
  styleUrls: ['./projectitemslist.component.scss'] , 
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
export class ProjectitemslistComponent implements OnInit {
  itemslist: any[]=[];
   public projectname : string;
   public page : number = 0 ;
   public totalRec : number;
   addbool : boolean = false;
   role :number ;
   activity : any[]=[];
  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar

    ,private translate : TranslateService , private  services :CoreService) {

       this.projectname = localStorage.getItem('projectname');
       this.role = +localStorage.getItem('Role');
     }

  ngOnInit() {
    this.services.getProjectitem().subscribe(
      data=> this.itemslist = data as any[], 
      err=> console.log(err)
    );

    this.totalRec = this.itemslist.length;



    this.services.getRole(this.role).subscribe(
      data=>{
            this.activity = data[0].activity_ids ;
          
            this.activity.forEach(element => {
               if(element.name == "create-project-item")
               {
                 this.addbool = true;
               }
            });
         } ,
         err=>console.log(err)
      )
  }


  openDialog()
  {
    const dialogRef = this.dialog.open(ProjectitemsComponent, {
       width: '80%',
       height: '85%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
