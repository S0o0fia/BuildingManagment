import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ProjectModel } from 'app/Models/Project/project-model';
import { NewProject } from 'app/Models/Project/new-project';
import { Rfi } from 'app/Models/RFI/rfi';
import { Quantity } from 'app/Models/Quantity/quantity';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { Approvedqty } from 'app/Models/Quantity/approvedqty';
import { Matetrial } from 'app/Models/Material/matetrial';
import { Mirequest } from 'app/Models/MIR Request/mirequest';

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
	public apiURL : string = 'http://94.99.142.220:8070/api';
	public db: string='nqproject';
	
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
		let userUrl='/users/get?db='+this.db+'&token='+localStorage.getItem("token");
		return this.http.get(this.apiURL+userUrl);
	}

	createProject (value:NewProject)
	{
		let projecturl = "/api_test/api_test?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"name":"'+
		value.name+
		'","contact_no":"'+value.contact_no+
		'","proj_consultant":'+value.proj_consultant+
		',"proj_contractor":'+value.proj_contractor+
		',"proj_val":'+value.project_val+
		',"first_pay":'+value.first_pay+
		',"latitude":'+value.lantitude+
		',"longitude":'+value.longitude+
		',"first_pay_percentage":'+value.first_pay_percentage+
		',"project_net":'+value.project_net+
		',"proj_duration_days":"'+value.proj_duration_days+
		'","proj_duration_monthes":"'+value.proj_duration_monthes+
		'","project_date":"'+value.project_date+
		'","project_hijri_date":"'+value.project_hijri_date+
		'","from_date":"'+value.delivery_date+
		'","delivery_date":"'+value.delivery_date+
		'","sig_date":"'+value.sig_date+
		'","proj_number":"'+value.proj_number+
		'","delivery_hijri_date":"'+value.delivery_hijri_date+
		'","project_type":"'+value.project_type+
		'","budget_year":"'+value.budget_year+
		'","proj_state":"active","description":"'+value.description+'"}';

		const headers = new HttpHeaders();
	
		headers.set('Content-Type', 'application/json; charset=utf-8');
		return this.http.post(this.apiURL+projecturl, null);
	}

	getQty_tbl()
	{
		let QtyUrl= "/table-qty/get?db="+this.db+"&token="+localStorage.getItem("token")+'&project_id='+localStorage.getItem("projectid");
		return this.http.get(this.apiURL+QtyUrl);
	}
	getType_forRFI ()
	{
		let typeRfi = "/types/get?db="+this.db+"&token="+localStorage.getItem("token");
		return  this.http.get(this.apiURL+typeRfi);
	
	}

	createRFi(value : Rfi)
	{
		
		let createRFi = "/rfi/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"request_num":"'
		+value.request_num+
		'","request_id":'+localStorage.getItem('projectid')+
		',"request_type":"'+value.request_ids+
		'","work_location":"'+value.work_location+
		'","inspect_date":"'+value.inspect_date+
		'","sation_from":"'+value.start_date+
		'","sation_to":"'+value.end_date+
		'","appled_to":"'+value.end_date+
		'","appled_from":"'+value.start_date+'"}';
		console.log(createRFi);
		return this.http.post(this.apiURL+createRFi , null);
	}
	
	createItemRFI(value : NewItemRFI )
	{
	  
		let createRFi = "/rfi/items/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"num":"'
		+value.num+
		'","rfi_id":'+value.rfi_id+
		',"qty":'+value.qty+
		',"name":"'+value.name+'"}';
		console.log(createRFi);
		return this.http.post(this.apiURL+createRFi , null);
	
	}
	createConsultantApprove(id : number , state : string , consultant_approve : string)
	{
		 let consultant_approvalUrl = "/rfi/set_state?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"id":'
		 +id+
		 ',"state":"'+state+
		 '","consultant_approval":"'+consultant_approve+'"}';
		 return this.http.post(this.apiURL+consultant_approvalUrl , null);
	}
	createQty(value : Quantity)
	{
		let createQtyturl = "/table-qty/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"main_section_id":'
		+value.main_section_id+
		',"first_subsection_id":'+value.first_subsection_id+
		',"second_subsection_id":'+value.second_subsection_id+
		',"product_uom":'+value.product_uom+
		',"project_id":'+value.projectid+
		',"item_qty":'+value.item_qty+
		',"price_unit":'+value.price_unit+
		',"price_total":'+value.price_total+
		',"item_number":"'+value.item_number+
		'","item_name":"'+value.item_name+
        '","description":"'+value.description+'"}';
       
		console.log(createQtyturl);
		return this.http.post(this.apiURL+createQtyturl , null);
	}
	getMainSectionList(){
		let mainSectionUrl='/section/get?token='+localStorage.getItem('token');
	   return this.http.get(this.apiURL+mainSectionUrl);
	}

	updateSate(state : string , id : number)
	{
		let updateUrl = "/rfi/set_state?db="+this.db+"&token="+localStorage.getItem("token")+'&values={"id":'+
		 id+
		 ',"consultant_approval":"waiting"'+
		 ',"state":"'+state+'"}';
		 return this.http.post(this.apiURL+updateUrl , null);
	}

	updateApprovdQty(data:Approvedqty){
            let approvedqtyUrl = "/rfi/items/approval_qty?db="+this.db+"&token="+localStorage.getItem("token")+'&values={"id":'+
			data.id+
			',"approved_qty":'+data.approved_qty+'}';

			return this.http.post(this.apiURL+approvedqtyUrl , null);

	}
	getRFI_tbl()
	{
		
		let RFIUrl= "/rfi/get?db="+this.db+"&token="+localStorage.getItem("token")+'&project_id='+localStorage.getItem("projectid");
	
	    
		return this.http.get<GetRFI[]>(this.apiURL+RFIUrl);

	}
	getItemRFI()
	{
		let getItemRFIUrl="/rfi/items/get?db="+this.db+'&token='+localStorage.getItem("token");
		return this.http.get<NewItemRFI[]>(this.apiURL+getItemRFIUrl);
	}
	getTypeofWork ()
	{

	}

	getStuats ()
	{
		return this.http.get("assets/data/status.json");
	}

	getUnit ()
	{
		let unitURL  ="/uoms/get?db="+this.db+"&token="+localStorage.getItem('token') ;
		return this.http.get(this.apiURL+unitURL);
	}

	getMIRequest ()
	{
	   		let mirequest  ="/factory/get?db="+this.db+"&token="+localStorage.getItem('token') ;
		    return this.http.get(this.apiURL+mirequest);	
	}

	createMIR(value : Mirequest)
	{
		let mirequest  ="/mir/create?db="+this.db+"&token="+localStorage.getItem('token')+'&values={"name":"'+value.name
		+'","request_date":"'+value.request_date +'"}';
        return this.http.post(this.apiURL+mirequest ,null);
	}

	createMIRItem(value : Matetrial)
	{
		let miritem  ="/mir/create?db="+this.db+"&token="+localStorage.getItem('token')+'&values={"name":"'+'"}';
        return this.http.post(this.apiURL+miritem ,null);
	}
}