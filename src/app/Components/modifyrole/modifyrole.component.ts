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

  role: any;
  rolename : string;
  roleid : number ;
  activityrights: any []=[];
  activities : any [] = []
  constructor(public dialogRef: MatDialogRef<RoleManagementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.services.getRole().subscribe(
      data=>{
        this.role = data as any ;
        console.log(this.role) ;
        this.roleid=this.role.id;
        this.rolename=this.role.name;
      },
     err=>console.log(err)
    );

    this.services.getActivityRights().subscribe(
      data=>{
        this.activityrights = data as any[] ;
        console.log(this.activityrights) ;
      },
     err=>console.log(err)
    );
  }

  choose(val)
  {
    //this.userjob = val;
  }

  Save()
  {
    // this.newUser = {
    //   name : this.username , 
    //   login : this.email , 
    //   password : this.password , 
    //   user_job : this.userjob
    // }

   

    // this.services.createUser(this.newUser).subscribe(
    //   data=>{
    //     let msg = this._snackBar.open('تم إنشاء المستخدم بنجاح' , 'إالغاء')
    //     if(msg)
    //     {
    //       location.reload();
    //     }
    //   },
    //   err=>console.log(err)
    // );
  }

}
