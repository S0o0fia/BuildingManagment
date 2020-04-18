import { Component, OnInit, inject, Inject } from '@angular/core';
import { UserslistComponent } from '../userslist/userslist.component';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';
import { Rfi } from 'app/Models/RFI/rfi';
import { User } from 'app/Models/User/user';

@Component({
  selector: 'ms-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  projectname : string;
  username : string ;
  password : string;
  email : string;
  newUser : User;
  userjob : string;
  jobtitle : string [] = [
     'system_admin' , 
    'amana_pm' , 
 'amana_eng' , 
    'consultant_pm' ,
    'consultant_res_eng',
 'consultant_eng',
    'consultant_count',
  'contractor_pm' , 
    'contractor_res_eng' ,
    'contractor_eng',
    'contractor_count'
  ]
  constructor(public dialogRef: MatDialogRef<UserslistComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){

      this.projectname = localStorage.getItem('projectname');

      dialogRef.disableClose = true;
    }

  ngOnInit() {
  }

  choose(val)
  {
    this.userjob = val;
  }

  Save()
  {
    this.newUser = {
      name : this.username , 
      login : this.email , 
      password : this.password , 
      user_job : this.userjob
    }

   

    this.services.createUser(this.newUser).subscribe(
      data=>{
        let msg = this._snackBar.open('تم إنشاء المستخدم بنجاح' , 'إالغاء')
        if(msg)
        {
          location.reload();
        }
      },
      err=>console.log(err)
    );
  }

}
