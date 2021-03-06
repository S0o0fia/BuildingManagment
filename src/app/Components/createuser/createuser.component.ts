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
  company : number;
  Role :number;
  section_id : number = 0;
  companies : any []=[];
  userRole : any []=[];
  specialest : any[]=[];
  cname : string;
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
  roleid : number;
  address : string ;
  zipcode : number; 
  postcode : number;
  phone : number;

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

    this.services.getSpeclization().subscribe(
      data=>{ this.specialest = data as any[] ; console.log(this.specialest) }, 
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

  special(val)
  {
    this.section_id = val;
  }
  Save()
  {
    

    if(this.isCompany == true)
    {
      this.newUser= {
        login : this.email , 
        name : this.cname , 
        password : this.password , 
        section_id : this.section_id , 
        user_job : this.userjob

      }
      
      this.services.createUser1(this.newUser , this.email , this.postcode , this.zipcode , this.phone , this.address).subscribe(
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
    else if(this.isEmpolyee == true)
    {
      this.newUser = {
        name : this.username , 
        login : this.email , 
        password : this.password , 
        user_job : this.userjob , 
        section_id : this.section_id
      }
      this.services.createUser2(this.newUser , this.company , this.phone).subscribe(
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

}
