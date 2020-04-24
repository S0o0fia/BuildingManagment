import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModifyroleComponent } from '../modifyrole/modifyrole.component';

@Component({
  selector: 'ms-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  rolelist : any[]=[];
  projectname : string;
  constructor(private services : CoreService , private dialog: MatDialog) { 

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectname = localStorage.getItem('projectname');
  }

  ngOnInit() {
    this.services.getRoles().subscribe(
      data=>{
        this.rolelist = data as any[] ;
        console.log(this.rolelist) ;

      },
     err=>console.log(err)
    );
  }

  openDialog(data: any)
  {
    const dialogRef = this.dialog.open(ModifyroleComponent, {
      width: '80%',
      height: '85%'
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
