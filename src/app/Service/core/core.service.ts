import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


import { ProjectModel } from 'app/Models/Project/project-model';
import { NewProject } from 'app/Models/Project/new-project';
import { Rfi } from 'app/Models/RFI/rfi';

@Injectable({
	providedIn: 'root'
})

export class CoreService {
	
	collapseSidebar 		 : boolean = false;
	collapseSidebarStatus : boolean;
	sidenavMode				 : string  = "side";
	sidenavOpen 			 : boolean = true;
	horizontalSideNavMode : string  = "over";
	horizontalSideNavOpen : boolean = false; 	
	projectDetailsContent : any;
	editProductData 		 : any;	
	apiURL : string = 'http://35.226.236.165:8069/api';
	db: string='nqproject';
	constructor(private matDialog : MatDialog,
					private http : HttpClient){
	}

	loginUser(value) {
   
		const headers = new HttpHeaders();
		 headers.set('Content-Type', 'application/json; charset=utf-8');
		 const  params = new  HttpParams()
		 .set('db', this.db)
		 .set('login', value.username)
		 .set('password',value.password);
		 return this.http.post(this.apiURL+"/authenticate" , null,{headers ,params});
  
  
	 }

	//Services for HomePage
	getTickerData(){
		return this.http.get('assets/data/ticker.json').pipe(map(response => response));
		}

	getCryptoStatsCardContent(){
		return this.http.get('assets/data/crypto_stats_card.json').pipe(map(response => response));
	}

   
	
	getProjectList(){
		let projUrl='/projects/get?db='+this.db+'&token='+localStorage.getItem("token");
		return this.http.get(this.apiURL+projUrl);
	}

	getUsers ()
	{
		let userUrl='/users/get?db='+this.db+'&token'+localStorage.getItem("token");
		return this.http.get(this.apiURL+userUrl);
	}

	createProject (value:NewProject)
	{
		let projecturl = "/project/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"name":"'+
		value.name+
		'","contact_no":"'+value.contact_no+
		'","proj_consultant":'+value.proj_consultant+
		',"proj_contractor":'+value.proj_contractor+
		',"proj_val":'+value.project_val+
		',"first_pay":'+value.first_pay+
		',"from_date":"'+value.from_date+
		'","proj_duration":"'+value.proj_duration+
		'","budget_year":"'+value.budget_year+
		'","proj_state":"active","description":"'+value.description+'"}';
debugger;
		let prj : NewProject = {
			name : "newprject" , 
			budget_year : "1223" ,
			contact_no  : 55352 ,
			description : "sosfsdpgs" ,
			first_pay : 2000 ,
			from_date : "11/11/2019",
			lantitude : 12.25563 ,
			longitude : 13.22555 , 
			proj_consultant : 8 ,
			proj_contractor : 6 ,
			proj_duration : 255 ,
			proj_state  : "active" ,
			project_val:520000 
        };
	

		console.log(projecturl);
		const headers = new HttpHeaders();
		const param = new HttpParams().set("values", JSON.stringify(prj));
		headers.set('Content-Type', 'application/json; charset=utf-8');
		return this.http.post(this.apiURL+projecturl, null);
	}

	getQty_tbl()
	{
		let QtyUrl= "/table-qty/get?db="+this.db+"&token="+localStorage.getItem("token")+'&project_id='+localStorage.getItem("prijectId");
		return this.http.get(this.apiURL+QtyUrl);
	}


	getMainSectionList(){
		let mainSectionUrl='/section/get?token='+localStorage.getItem('token');
	   return this.http.get(this.apiURL+mainSectionUrl);
	}

	
	getRFI_tbl()
	{
		
		let RFIUrl= "/rfi/get?db="+this.db+"&token="+localStorage.getItem("token")+'&project_id='+localStorage.getItem("prijectId");
		return this.http.get<Rfi>(this.apiURL+RFIUrl);

	}
	 
	getTypeofWork ()
	{

	}

	getStuats ()
	{
		return this.http.get("assets/data/status.json");
	}
}