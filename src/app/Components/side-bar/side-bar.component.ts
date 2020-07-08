import { Component, OnInit, Input, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { Menu } from 'app/Models/Menu/menu';

@Component({
	selector: 'ms-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})

 export class SideBarComponent implements OnInit {


 showChart: boolean;
   user : string;
   menuList : Menu[]=[];
   role : any ;
   activity : any [] =[];

   public username :string = 'Nqraa';
   public Title :string =   'Projects Managment' ;
	constructor( public translate: TranslateService, 
                private router: Router,
				public coreService: CoreService,
                ) { 

					this.user = localStorage.getItem('loginUser');
					this.role = localStorage.getItem('Role');
                  
                }

	ngOnInit() {

		setTimeout(()=>{
			this.showChart = true;
		 },0)
		this.coreService.getRole(this.role).subscribe(
			data=>{
				this.activity = data[0].activity_ids ;
				
			this.activity.forEach(element => {
				switch(element.name)
				{
					//Home
					case "Dashboard" : 
					{
						this.menuList.push( {
							state: 'crm',
							name: 'Home',
							type: 'link',
							icon: 'home',
						
						   
						  });
						  break;
					}
					//ProjectList
					case "Projects List" :
						{
							this.menuList.push( {
								state: 'projectslist',
								name: 'Projects List',
								type: 'link',
								icon: 'note' });
							  break;
						}

					//Create Project
					case "create project":
						{
							this.menuList.push( {
								state: 'createproject',
								name: 'New Project',
								type: 'link',
								icon: 'create_new_folder',
								});
							  break;
						}

					//Attendence
					case "Attendance":
						{
							this.menuList.push( {
								state: 'attendance',
								name: 'Attendance',
								type: 'link',
								icon: 'access_alarm',
								});
							  break;
						}

					//Approved Quantities
					case "Approved Quantities":
						{
							this.menuList.push( {
								state : 'approvedqty',
								name : 'Approved Quantities' ,
								type : 'link',
								icon : 'check_box' ,
							});
								break;
						}

							//Consultant Contracts
					case "Consultant Contracts":
						{
							this.menuList.push( {
								state : 'ConsultantContracts',
								name : 'ConsultantContracts' , 
								type : 'link' , 
								icon : 'supervised_user_circle' ,
							});
								break;
						}

									//Consultant Contracts
					case "Setting":
						{
							this.menuList.push( {
								state: 'settings',
								name: 'Global Setting',
								type: 'sub',
								icon: 'settings',
								children: [
								  { state:'userlist', name: 'Accouting',   type: 'link'  },
								  {state:'role-management' ,  name: 'Permission',   type: 'link' },
								  {state: 'compantmanage', name: 'Company Managment',   type: 'link' },  
								],
							   
							});
								break;
						}

						//Logout
						case "Log Out":
							{
								this.menuList.push( {
									state: 'logout',
									name: 'Logout',
									type: 'link',
									icon: 'exit_to_app' ,
								});
									break;
							}

					default : break;
				}
			});
		
			} , 
			err=>console.log(err)
		)

		


		  console.log(this.menuList);
	}

	//render to the crm page
	onClick(){
		    this.router.navigate(['home/crm']);
     
	}

	/**
     * addMenuItem is used to add a new menu into menu list.
     */
//     addMenuItem(): void {
//       this.menuItems.add({
//          state: 'pages',
//          name: 'GENE MENU',
//          type: 'sub',
//          icon: 'trending_flat',
//          children: [
//             {state: 'blank', name: 'SUB MENU1'},
//             {state: 'blank', name: 'SUB MENU2'}
//          ]
//       });
//    }

// 
}
