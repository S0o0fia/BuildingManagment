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
  company : string = "";
  Role : string = "";
  companies : any []=[];
  userRole : any []=[];
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
  isCompany : boolean = false ;
  isEmpolyee : boolean = false ;
  constructor(public dialogRef: MatDialogRef<UserslistComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){

      this.projectname = localStorage.getItem('projectname');

      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.services.getCompanies().subscribe(
      data=>{ this.companies = data as any[]} ,
      err=> console.log(err)
    )

    this.services.getRoles().subscribe(
      data=> {this.userRole = data as any[]}, 
      err=> console.log(err)
    )
  }

  Empolyee(event)
  {
    if(event.checked == true)
    {
      this.isEmpolyee = true;
    }
    else if(event.checked == false)
    {
      this.isEmpolyee = false;

    }

  }
  Company(event)
  {
     if(event.checked == true)
     {
       this.isCompany = true;
     }
    else if(event.checked == false)
    {
      this.isCompany = false;
    }
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
