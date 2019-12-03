import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service'
import { TranslateService } from '@ngx-translate/core';
import { User } from 'app/Models/User/user';

import { Router } from '@angular/router';

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
               public translate : TranslateService  , public router:Router ) { }

   user:User;
   token : any;
   // when email and password is correct, user logged in.
   login(value) {
     
   
   console.log(value.username +value.password);
      this.authService.loginUser(value).subscribe(
        (data)=>{
           debugger;
             localStorage.setItem("token" , data["token"]);
             localStorage.setItem("loginUser" , data["token"]);
             this.router.navigate(['/home/crm']);
         }

      );
   }
	
}



