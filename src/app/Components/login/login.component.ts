import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service'
import { TranslateService } from '@ngx-translate/core';
import { User } from 'app/Models/User/user';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
   animations:[
      trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('900ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),
      
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
      ])
    ]) ,

    trigger('slideLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('900ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),
      
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(-100%)', 'opacity': 0 }))
      ])
    ])
  ]
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
             localStorage.setItem("Role" , data["role_detail"].id )
             localStorage.setItem("company_id",data["company_id"]);
             
             console.log('CID: '+localStorage.getItem["company_id"]);
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



