import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModifyroleComponent } from '../modifyrole/modifyrole.component';

@Component({
  selector: 'ms-projectschedule',
  templateUrl: './projectschedule.component.html',
  styleUrls: ['./projectschedule.component.scss']
})
export class ProjectscheduleComponent implements OnInit {

  schedulelist: any[]=[];
  rolelist : any[]=[];
  projectname : string;
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
  }

  openDialog(data: any)
  {
    const dialogRef = this.dialog.open(ModifyroleComponent, {
      width: '80%',
      height: '85%',
      data: data.id
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
