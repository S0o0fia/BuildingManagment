import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service'
import { TranslateService } from '@ngx-translate/core';
import { User } from 'app/Models/User/user';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
	
  username    : string ;
  password : string;
  

  constructor( public authService: CoreService,
               public translate : TranslateService  , public router:Router , public _snackbar : MatSnackBar ) { }

   user:User;
   token : any;
   // when email and password is correct, user logged in.
   login(value) {
     
   
   console.log(value.username +value.password);
      this.authService.loginUser(value).subscribe(
        (data)=>{
           
             localStorage.setItem("token" , data["token"]);
             localStorage.setItem("loginUser" , data["name"]);
             localStorage.setItem("Role" , data["role_detail"].code )
             console.log(data);
             this.router.navigate(['/home/crm']);
         },
         (err)=>
         {
            this. _snackbar.open("اسم المستخدم او كلمة المرور غير صحيحة" , "إغلاق" , {
               duration: 3000,
               verticalPosition: 'top',
               horizontalPosition : 'center' ,
               panelClass: ['my-snack-bar']
             })

         }

      );
   }
	
}



