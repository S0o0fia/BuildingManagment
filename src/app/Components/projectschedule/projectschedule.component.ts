import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModifyprojectscheduleComponent } from '../modifyprojectschedule/modifyprojectschedule.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-projectschedule',
  templateUrl: './projectschedule.component.html',
  styleUrls: ['./projectschedule.component.scss'] , 
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
export class ProjectscheduleComponent implements OnInit {

  schedulelist: any[]=[];
  rolelist : any[]=[];
  projectname : string;
  page : number = 0;
  totalRec : number;
  constructor(private services : CoreService , private dialog: MatDialog) { 

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectname = localStorage.getItem('projectname');
  }

  ngOnInit() {
    let project_id=localStorage.getItem("projectid");
    this.services.getSchedule(project_id).subscribe(
      data=>{
        this.schedulelist = data as any[];
        console.log(this.schedulelist) ;

      },
     err=>console.log(err)
    );

    this.totalRec = this.schedulelist.length;
  }

  openDialog(data: any)
  {
    const dialogRef = this.dialog.open(ModifyprojectscheduleComponent, {
      width: '80%',
      height: '85%',
      data: data.id
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
