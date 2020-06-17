import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModifyroleComponent } from '../modifyrole/modifyrole.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'] , 
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
      height: '75%',
      data: data.id
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
