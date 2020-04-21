import { Component, OnInit, Inject } from '@angular/core';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-modifyrole',
  templateUrl: './modifyrole.component.html',
  styleUrls: ['./modifyrole.component.scss']
})
export class ModifyroleComponent implements OnInit {

  projectname : string;
  username : string ;
  password : string;
  email : string;
  newUser : any;
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
  constructor(public dialogRef: MatDialogRef<RoleManagementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
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
