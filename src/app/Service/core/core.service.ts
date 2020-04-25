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
import { Projectitem } from 'app/Models/ProjectItem/projectitem';
import { Miritems } from 'app/Models/MIR Request/miritems';
import { Extract } from '../../Models/Extract/extract';
import { Comment } from '../../Models/Comment/comment';
import { Count } from 'app/Models/Count/count';
import { Countitem } from 'app/Models/Count/countitem';
import { Extractitem } from 'app/Models/Extract/extractitem';
import { InvoiceDiscount } from 'app/Models/Extract/invoice-discount';
import { User } from 'app/Models/User/user';
import { Consultantqty } from 'app/Models/Consqty/consultantqty';
import { Consulantcontract } from 'app/Models/consutlantcontract/consulantcontract';
import { Timesheet } from 'app/Models/Timesheet/timesheet';

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
	public apiURL : string = 'http://nqraait.ddns.net:8070/api';
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
		return this.http.get<any[]>(this.apiURL+userUrl);
	}

	getRoles ()
	{
		let userUrl='/usersrole/get?db='+this.db+'&token='+localStorage.getItem("token");
		return this.http.get(this.apiURL+userUrl);
	}

	getRole (id: number)
	{
		debugger
		let userUrl='/usersrole/get?db='+this.db+'&token='+localStorage.getItem("token")+'&role_id='+id;
		return this.http.get(this.apiURL+userUrl);
	}

	getActivityRights()
	{
		let userUrl='/activities/get?db='+this.db+'&token='+localStorage.getItem("token");
		return this.http.get(this.apiURL+userUrl);
	}

	createUser (value : User)
	{
		let userUrl2='/users/create?db='+this.db+'&token='+localStorage.getItem("token")+'&values={'+
		'"name":"'+value.name+
		'","password":"'+value.password+
		'","login":"'+value.login+
		'","user_job":"'+value.user_job+'"}';
        console.log(userUrl2);
		return this.http.post(this.apiURL+userUrl2 , null);
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
		'","proj_state":"'+value.proj_state+
		'","proj_situation":"'+value.proj_situation+
		'","date_situation":"'+value.date_situation+
		'","description":"'+value.description+
		'","with_vat":'+value.with_vat+
		'}';
        console.log(projecturl);
		const headers = new HttpHeaders();
	
		headers.set('Content-Type', 'application/json; charset=utf-8');
		debugger;
		return this.http.post(this.apiURL+projecturl, null);
	}


	getQty_tbl()
	{
		let QtyUrl= "/table-qty/get?db="+this.db+"&token="+localStorage.getItem("token")+'&project_id='+localStorage.getItem("projectid");
		return this.http.get<any[]>(this.apiURL+QtyUrl);
	}
	getType_forRFI ()
	{
		let typeRfi = "/types/get?db="+this.db+"&token="+localStorage.getItem("token")+"&project_id="+localStorage.getItem('projectid');
		return  this.http.get(this.apiURL+typeRfi);
	
	}

	createRFi(value : Rfi)
	{
		
		let createRFi = "/rfi/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"request_num":"'
		+value.request_num+
		'","request_id":'+localStorage.getItem('projectid')+
		',"request_type":'+value.request_ids+
		',"pitem":"'+value.pitem+
		
		'","quantity_id":'+value.item_id+
		',"item_id":'+value.work_location+
		',"inspect_date":"'+value.inspect_date+
		'","sation_from":"'+value.start_date+
		'","sation_to":"'+value.end_date+
		'","appled_to":"'+value.end_date+
		'","appled_from":"'+value.start_date+'"}';
		console.log(createRFi);
		return this.http.post(this.apiURL+createRFi , null);
	}
	
	createItemRFI(value : NewItemRFI )
	{ 
		let createRFi = "/rfi/items/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values='+
		'{"rfi_id":'+value.rfi_id+
		',"name":"'+value.inspect_location+
		'","qty":'+value.qty+
		'}';
		console.log(createRFi);
		return this.http.post(this.apiURL+createRFi , null);
	
	}
	
	createConsultantApprove(id : number , state : string , consultant_approve : string , comment : string)
	{
		 let consultant_approvalUrl = "/rfi/set_state?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"id":'
		 +id+
		 ',"state":"'+state+
		 '","comment":"'+comment+
		 '","consultant_approval":"'+consultant_approve+'"}';
	
		 return this.http.post(this.apiURL+consultant_approvalUrl , null);
	}
	createQty(value : Quantity)
	{
		let createQtyturl = "/table-qty/create?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"main_section_id":'
		+value.main_section_id+
		',"project_items_id":'+value.first_subsection_id+
		',"item_type":"'+value.second_subsection_id+
		'","product_uom":'+value.product_uom+
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
	
	getMainSectionList(filter = false){
		let mainSectionUrl='/section/get?token='+localStorage.getItem('token')+
		'&project_id='+localStorage.getItem("projectid")+'&filter='+filter;
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
            let approvedqtyUrl = "/rfi/items/approved_qty?db="+this.db+"&token="+localStorage.getItem("token")+'&values={"id":'+
			data.id+
			',"approved_qty":'+data.approved_qty+'}';

			return this.http.post(this.apiURL+approvedqtyUrl , null);

	}
	getRFI_tbl()
	{
		debugger;
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
	 
	getMIR ()
	{
 debugger;
		let mirget = "/mir/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem("projectid");
		return this.http.get<any[]>(this.apiURL+mirget);
	}

	getMirItem ()
	{
		debugger;
		let miritemget = "/mir/items/get?db="+this.db+"&token="+localStorage.getItem('token');
		return this.http.get<Miritems[]>(this.apiURL+miritemget);
	}

	createConsultantApproveMIR(id : number , state : string , consultant_approve : string)
	{
		 let consultant_approvalUrl = "/mir/set_state?db="+this.db+'&token='+localStorage.getItem("token")+'&values={"id":'
		 +id+
		 ',"state":"'+state+
		 '","consultant_approval":"'+consultant_approve+'"}';
		 return this.http.post(this.apiURL+consultant_approvalUrl , null);
	}
	createMIR(value : Mirequest)
	{
		debugger
		let mirequest  ="/mir/create?db="+this.db+"&token="+localStorage.getItem('token')+'&values={"name":"'+value.name
		+'","request_date":"'+value.request_date +'"}';
        return this.http.post(this.apiURL+mirequest ,null);
	}

	createMIRItem(value : Matetrial)
	{
		let miritem  ="/mir/items/create?db="+this.db+"&token="+localStorage.getItem('token')+'&values={"name":"'+value.name
		+'","material_id":'+value.material_id
		+',"factory_id":'+value.factory_id
		+',"mir_id":'+value.mir_id
		+',"qty":'+value.qty
		'}';
        return this.http.post(this.apiURL+miritem ,null);
	}

	
	mirApprovedqty(data:Approvedqty)
	{
		let approvedQtyMir = "/mir/items/approved_qty?db="+this.db+"&token="+localStorage.getItem("token")+'&values={"id":'+
		data.id+
		',"approved_qty":'+data.approved_qty+'}';

		return this.http.post(this.apiURL+approvedQtyMir , null);

	}


	
	updateSateMir(state : string , id : number)
	{
		let updateMirUrl = "/mir/set_state?db="+this.db+"&token="+localStorage.getItem("token")+'&values={"id":'+
		 id+
		 ',"consultant_approval":"waiting"'+
		 ',"state":"'+state+'"}';
		 return this.http.post(this.apiURL+updateMirUrl , null);
	}

	
	deleteproject (id )
	{
		let deleteproject = "/project/delete?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+id;
		return this.http.get(this.apiURL+deleteproject);
	}

	getProject()
	{
		let project ="/projects/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get(this.apiURL+project);
	}

	getProjectitemtype()
	{
		let project ="/project/items/type/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get(this.apiURL+project);
	}

	
	getProjectitem()
	{
		let projecttm ="/project/items/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get(this.apiURL+projecttm);
	}

	addprojectitem(value : Projectitem)
	{
		let projectitem ="/project/items/create?db="+this.db+"&token="+localStorage.getItem('token')+'&values={'+
		'"name":"'+value.name+
		'","type_id":'+value.type_id+
		',"project_id":'+localStorage.getItem('projectid')+
		'}';

		return this.http.post(this.apiURL+projectitem,null);
	}

	gettotals(project_items_id , main_section_id)
	{
		debugger;
		let total ="/total/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid')
		+'&project_items_id='+project_items_id+'&main_section_id='+main_section_id;
		return this.http.get(this.apiURL+total);
	}

	gettotal()
	{
		let total ="/total/get?db="+this.db+"&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		
		return this.http.get(this.apiURL+total);
	}

	Applydiscount(value:number)
	{
		let discount = "/project/edit?db="+this.db+"&token="+localStorage.getItem('token')+'&values={'+
		'"discount":'+value+'}&project_id='+localStorage.getItem('projectid');
		return this.http.post(this.apiURL+discount , null);

	}


	getApprovedQty (projectid , fromdate , todate)
	{
	   let approve = "/approved_qty/get?db=nqproject&token="+localStorage.getItem('token')+"&project_id="+projectid+
	   "&from_date="+fromdate+"&to="+todate;
	   console.log(approve);
	   return this.http.get(this.apiURL+approve );

	}

	getApproveQty ()
	{
	   let approveurl = "/approved_qty/get?db=nqproject&token="+localStorage.getItem('token')+"&project_id="+localStorage.getItem('projectid');
	
	   return this.http.get(this.apiURL+approveurl );

	}


	getInvoice()
	{
		let getinvoice = "/invoice/get?db=nqproject&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get(this.apiURL+getinvoice);
	}

	getInvoiceitems(id)
	{
		let getinvoiceitem = "/invoice/items/get?db=nqproject&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid')+
		'&project_invoice_id='+id;
		return this.http.get(this.apiURL+getinvoiceitem);
	}

	getInvoicediscount(id)
	{
		let getinvoicedisciunt = "/invoice/discount/get?db=nqproject&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid')+
		'&project_invoice_id='+id;
		console.log(getinvoicedisciunt);
		return this.http.get(this.apiURL+getinvoicedisciunt);
	}
	createInvoice (values : Extract)
	{
	   let extracturl = "/invoice/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	   '"name":"'+values.name+
	   '","date_from":"'+values.date_from+
	   '","date_to":"'+values.date_to+
	   '","invoice_type":"'+values.invoice_type+
	   '","paid":'+values.paid+	   
	   ',"Total_vat":'+values.Total_vat+
	   ',"total_discount":'+values.total_discount+
	   ',"total_excuted":'+values.total_excuted+
	   ',"total_price":'+values.total_price+
	   ',"project_id":'+values.project_id+
	   '}';

	   console.log(extracturl);

	   return this.http.post(this.apiURL+extracturl , null);


	}

	createInvoiceitem (values : Extractitem)
	{
	   let extracturl = "/invoice/items/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	   '"item_number":"'+values.item_number+
	   '","item_name":"'+values.item_name+
	   '","qty":'+values.qty+
	   ',"approved_qty":'+values.approved_qty+
	   ',"p_approved_qty":'+values.p_approved_qty+
	   ',"price":'+values.price+
	   ',"project_invoice_id":'+values.extract_id+
	   '}';

	    console.log(extracturl);
	   return this.http.post(this.apiURL+extracturl , null);


	}

	createInvoiceDiscount(value : InvoiceDiscount)
	{
	  let invoicediscount="/invoice/discount/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	  '"name":"'+value.name+
	  '","total":'+value.total+
	  ',"project_invoice_id":'+value.project_invoice_id+'}';
	  console.log(invoicediscount);
	  return this.http.post(this.apiURL+invoicediscount , null);
	}

	getInvoiceName()
	{
		let invoicename = "/invoice/get_name?db=nqproject&token="+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get(this.apiURL+invoicename);
	}


	file : any;
	UploadFile(filename: string, base64: string, rfi_id: number)
	{  
		// let headers = new HttpHeaders({ 'Content-Type': '"multipart/form-data;'});
		// const formData: FormData = new FormData();
		// formData.append('fileKey', fd, fd.name);
		// let url= "/attachment/create?db=nqproject&token="+localStorage.getItem('token')+'&values='+
		// '{"project_id":'+localStorage.getItem('projectid')+
		// ',"name":"filename"}';

		let url="/attachment/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	  '"name":"'+filename+
	  '","base64":"'+base64+
	  '","project_id":'+localStorage.getItem('projectid')+
	  ',"rfi_id":'+rfi_id+'}';

	  return this.http.post(this.apiURL+url, null);
	
	}


	
	UploadFile2(filename: string, base64: string, project_id: number)
	{  
		// let headers = new HttpHeaders({ 'Content-Type': '"multipart/form-data;'});
		// const formData: FormData = new FormData();
		// formData.append('fileKey', fd, fd.name);
		// let url= "/attachment/create?db=nqproject&token="+localStorage.getItem('token')+'&values='+
		// '{"project_id":'+localStorage.getItem('projectid')+
		// ',"name":"filename"}';

		let url="/attachment/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	  '"name":"'+filename+
	  '","base64":"'+base64+
	  '","project_id":'+project_id+
	   '}';
      console.log(url);
	  return this.http.post(this.apiURL+url, null);
	
	}

	CreateComment ( comment : Comment )
	{
		debugger;
		let url = '/rfi/comments/create?db=nqproject&token='+localStorage.getItem('token')+
		'&values={'+
		'"section_id":'+comment.section_id+
		',"comments":"'+comment.comments+
		'","rfi_id":'+comment.rfi_id+
		',"name":"'+comment.create_uid+
		
		'"}';
          console.log(url);
		return this.http.post(this.apiURL+url , null);
	}

	CreateCommentForCount ( comment : any )
	{
		debugger;
		let url = '/count/comments/create?db=nqproject&token='+localStorage.getItem('token')+
		'&values={'+
		'"user_id":'+comment.user_id+
		',"comments":"'+comment.comments+
		'","count_id":'+comment.rfi_id+
		',"name":"'+comment.create_uid+
		
		'"}';
          console.log(url);
		return this.http.post(this.apiURL+url , null);
	}

	getCommentForCount ( id)
	{
		debugger;
		let url = '/count/comments/get?db=nqproject&token='+localStorage.getItem('token')+'&count_id='+id;
		return this.http.get(this.apiURL+url);
	}

	getComment ( id)
	{
		let url = '/rfi/comments/get?db=nqproject&token='+localStorage.getItem('token')+'&rfi_id='+id;
		return this.http.get(this.apiURL+url);
	}

	getRFIwithItemFilter(id: number , sdata : string , edata : string)
	{
		let geturl = '/approved_rfi/get?db=nqproject&token='+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid')+
		'&from_date='+sdata+'&to='+edata+'&item_id='+id;
	
		return this.http.get(this.apiURL+geturl);	
	}

	createCount(counts: Count)
	{
		debugger;
		let count = '/count/create?db=nqproject&token='+localStorage.getItem('token')+
		'&values={"quantity_id" : '+counts.qunatity_id+
		',"date_from":"'+counts.fromdate+
		'","date_to" :"'+counts.todate+
		'","project_id":'+counts.projectid+'}';
		console.log(count);
       
		return this.http.post(this.apiURL+count , null);
	}

	createcountItem(countitem : Countitem)
	{
		debugger;
		let itemUrl = '/count/items/create?db=nqproject&token='+localStorage.getItem('token')+
		'&values={"count_id":'+countitem.count_id+
		',"location" :"'+countitem.location+
		'","location_id":'+countitem.location_id+		
		',"description":"'+countitem.description+
		'","qty":'+countitem.qty+
		',"qty_height":'+countitem.qty_height+
		',"qty_length":'+countitem.qty_length+
		',"qty_width":'+countitem.qty_width+
		',"qty_unit":'+countitem.qty_unit+
		',"qty_pers":'+countitem.qty_pers+
		'}';
        console.log(itemUrl);
		return this.http.post(this.apiURL+itemUrl , null);
	}

	getCount()
	{
		let counturl = '/count/get?db=nqproject&token='+localStorage.getItem('token')+'&project_id='+localStorage.getItem('projectid');
		return this.http.get<any[]>(this.apiURL+counturl);
	}

	getCountItem(id)
	{
		debugger;
		let counturl = '/count/items/get?db=nqproject&token='+localStorage.getItem('token')+'&count_id='+id;
		return this.http.get<any[]>(this.apiURL+counturl);
	}

	setCountState(state : string , id)
	{
		let counturl = '/count/set_state?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
		'"state":"'+state+
		'", "id":'+id +
		'}';

		console.log(counturl);
		return this.http.post(this.apiURL+counturl ,null);
	}

	approveCountQty(id : number, approve : number, uom: string, app_len: number,
		 app_wid: number = 0, app_hei: number = 0, app_per: number , approved_unit : number)
	{
	
      let countQtydd = '/count/items/approved_qty?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
	  '"approved_qty":'+approve+
	  ' , "id":'+id +
	  ' , "approved_length":'+app_len +
	  ' , "approved_unit":'+approved_unit+
	  ' , "approved_width":'+app_wid +
	  ' , "approved_height":'+app_hei +
	  ', "approved_pers":'+app_per +
	  '}';	 
      console.log(countQtydd);
	  return this.http.post(this.apiURL+countQtydd ,null);
	}


   getSpeclization()
   {
	   let url = '/consultant/specialty/get?db=nqproject&token='+localStorage.getItem('token');
		return this.http.get(this.apiURL+url);
  }


  getQualifications()
   {
	   let url = '/consultant/qualifications/get?db=nqproject&token='+localStorage.getItem('token');
	  
		return this.http.get(this.apiURL+url);
  }

  getConsultantContract()
  {

	let url = '/consultant/contract/get?db=nqproject&token='+localStorage.getItem('token');
	
	 return this.http.get(this.apiURL+url);
  }


  
  getConsultantqty()
  {

	let url = '/consultant/qty/get?db=nqproject&token='+localStorage.getItem('token');
	
	 return this.http.get<any[]>(this.apiURL+url);
  }

  createConsultantqty(value : Consultantqty)
  {
	let url = '/consultant/qty/create?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
	'"contract_id":'+value.contract_id+
	',"description":"'+value.description+
	'","duartion":'+value.duartion+
	',"price":'+value.price+
	',"price_total":'+value.price_total+
	',"qty" :'+value.qty+
	',"qualification_id":'+value.qualification_id+
	',"specialty_id":'+value.specialty_id+'}';
	return this.http.post(this.apiURL+url, null);

  }

  createConsultantContract(value : Consulantcontract)
  {
	let url = '/consultant/contract/create?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
	'"consultant_id":'+value.consultant_id+
	',"description":"'+value.description+
	'","contract_value":'+value.contract_value+
	',"from_date":"'+value.from_date+
	'","to_date":"'+value.to_date+
	'","name" :"'+value.name+
	'"}';
  
	return this.http.post(this.apiURL+url, null);

  }

  getTimesheet()
  {
	  let url = '/consultant/timesheet/get?db=nqproject&token='+localStorage.getItem('token');
	
	 return this.http.get<any[]>(this.apiURL+url);

  }

  createTimesheet(value:Timesheet)
  {
	let url = '/consultant/timesheet/create?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
	'"contract_id":'+value.contract_id+
	',"description":"'+value.description+
	'","from_date":"'+value.from_date+
	'","to_date":"'+value.to_date+
	'","position_id":'+value.position_id+
	',"user_id":'+value.user_name+
	',"qualification_id":'+value.qualification_id+
	',"project_id":'+value.project_id+
	',"specialty_id":'+value.specialty_id+
	'}';
	console.log(url);
   
	return this.http.post(this.apiURL+url, null);

  }

  setConsultantState(id : number , state : string )
  {
	
	let url = '/consultant/timesheet/set_state?db=nqproject&token='+localStorage.getItem('token')+'&values={'+
	'"id":'+id+
	',"state":"'+state+'"}';
 
	return this.http.post(this.apiURL+url, null);

  }

  getConsultantInvoices()
  {
	  let url = '/consultant/invoice/get?db=nqproject&token='+localStorage.getItem('token');
	  return this.http.get<any[]>(this.apiURL+url);
  }

  getConsultantInvoicesName(contract_id : number)
  {
	  let url = '/consultant/invoice/get_name?db=nqproject&token='+localStorage.getItem('token')+'&contract_id='+contract_id;
	  return this.http.get<any[]>(this.apiURL+url);
  }


  getApprovedTimesheet(fromdate : string , todate:string , contract_id:number)
  {

    
	  let url = '/approved_ts/get?db=nqproject&token='+localStorage.getItem('token')+'&contract_id='+contract_id+
	  '&from_date='+fromdate+'&to='+todate;
	  return this.http.get<any[]>(this.apiURL+url);

  }


  createConsultantInvoices(values:Extract)
  {
	let extracturl = "/consultant/invoice/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	'"name":"'+values.name+
	'","date_from":"'+values.date_from+
	'","date_to":"'+values.date_to+
	'","invoice_type":"'+values.invoice_type+
	'","paid":'+values.paid+	   
	',"Total_vat":'+values.Total_vat+
	',"total_discount":'+values.total_discount+
	',"total_excuted":'+values.total_excuted+
	',"total_price":'+values.total_price+
	',"contract_id":'+values.project_id+
	'}';
   console.log(extracturl);
	return this.http.post(this.apiURL+extracturl, null);
  }

  createConsultantDiscount(value : InvoiceDiscount)
  {
	let invoicediscount="/consultant/invoice/discount/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	'"name":"'+value.name+
	'","total":'+value.total+
	',"consultant_invoice_id":'+value.project_invoice_id+'}';
	console.log(invoicediscount);
	return this.http.post(this.apiURL+invoicediscount , null);
  }
  createConsultantInvoiceitem (values : Extractitem  , timeshhet: number)
  {
	 let extracturl = "/consultant/invoice/items/create?db=nqproject&token="+localStorage.getItem('token')+'&values={'+
	 '"item_number":"'+values.item_number+
	 '","item_name":"'+values.item_name+
	 '","qty":'+values.qty+
	 ',"approved_qty":'+values.approved_qty+
	 ',"p_approved_qty":'+values.p_approved_qty+
	 ',"price":'+values.price+
	 ',"contract_invoice_id":'+values.extract_id+
	 ',"timesheet_id":'+timeshhet+
	 '}';

	  console.log(extracturl);
	 return this.http.post(this.apiURL+extracturl , null);


  }

  getConsultantInvoice()
  {
	let extracturl = "/consultant/invoice/get?db=nqproject&token="+localStorage.getItem('token');
    return this.http.get(this.apiURL+extracturl);
  }

  getConsultantInvoiceDiscount(id)
  {
	let getinvoicedisciunt = "/consultant/invoice/discount/get?db=nqproject&token="+localStorage.getItem('token')+
	'&consultant_invoice_id='+id;
	console.log(getinvoicedisciunt);
	return this.http.get(this.apiURL+getinvoicedisciunt);
  }

  getConsultantInvoiceitems(id)
  {
	let getinvoicedisciunt = "/consultant/invoice/items/get?db=nqproject&token="+localStorage.getItem('token')+
	'&contract_invoice_id='+id;
	console.log(getinvoicedisciunt);
	return this.http.get(this.apiURL+getinvoicedisciunt);
  }
}

