import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateuserComponent } from '../createuser/createuser.component';

@Component({
  selector: 'ms-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {

  userlist : any[]=[];
  projectname : string;
  constructor(private services : CoreService , private dialog: MatDialog) { 

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectname = localStorage.getItem('projectname');
  }

  ngOnInit() {
    this.services.getUsers().subscribe(
      data=>{
        this.userlist = data as any[] ;
        console.log(this.userlist) ;

      },
     err=>console.log(err)
    );
  }

  openDialog()
  {
    const dialogRef = this.dialog.open(CreateuserComponent, {
      width: '80%',
      height: '85%'
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
