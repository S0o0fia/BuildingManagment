import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CoreService } from 'app/service/core/core.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NewProject } from 'app/Models/Project/new-project';
import { PageTitleService } from '../core/page-title/page-title.service';
import { ProjectModel } from 'app/Models/Project/project-model';
import { DatePipe, formatDate } from '@angular/common';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { MatDialog } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';

@Component({
  selector: 'ms-creatproject',
  templateUrl: './creatproject.component.html',
  styleUrls: ['./creatproject.component.scss']
})
export class CreatprojectComponent implements OnInit {

//    longitude = 20.728218;
// latitude = 52.128973;

// markers = [
// { latitude: 52.228973, longitude: 20.728218 }
// ];


// this.markers.push({ latitude: lat, longitude: lng });}

  selectedIndex: number = 0;
  ProjectList   : any;
  newProject : NewProject;
  name : string ="" ;
  consultant_name :string = ""; 
  contractor_name  :string = ""; 
  contact_number  :number; 
  project_amount  :number; 
  project_duration  :number ; 
  first_pay : number;
  within_project :string="";
  budget_year  :string = ""; 
  status  :string = ""; 
  stiuation : string = "";
  description  :string = ""; 
  startdate_hijri : Date = new Date();
  startdate:Date = new Date();
  minDate:Date;
  maxDate :Date;
  lng : number;
  lat:number;
  users : any;
  netcost :number=0;
  perface_ratio : number=0;
  calender : number =0;
  duration : number=0;
  project_duration_days : number = 0;
  project_duration_months : number = 0;
  project_duration_h_months : number = 0;
  deliverdate : Date = new Date()  ;
  deliverdate_hijri : Date = new Date();
  type : string="";
  proj_number: string = "";
  sig_date : Date = new Date(); 
  stiuationdate : Date = new Date();
  uploader: FileUploader = new FileUploader({url: ''});
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  from_hijri : string;
  qty_type : boolean;
  with_vat : boolean = false;
  containfirst : boolean = false;



     /**
      *fileOverBase fires during 'over' and 'out' events for Drop Area.
      */
     fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
  }

  /**
    *fileOverAnother fires after a file has been dropped on a Drop Area.
    */
  fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
  }

  constructor( private pageTitleService: PageTitleService, private formatPipe: NumberFormatPipe,
               
               private translate : TranslateService , public service : CoreService
                , public fb: FormBuilder , private dialog: MatDialog) {

                  this.minDate = new Date(1900,1,1);
                  this.maxDate = new Date(2050,1,1);

                  this.lng=46.6753;
                  this.lat=24.7136;

                  this.qty_type = false;

                 
               }

  ngOnInit() {
     this.pageTitleService.setTitle("إنشاء مشروع جديد");
     this.service.getUsers().subscribe(
       data=>{this.users=data ;
     
      },
       err=> console.log(err)
     );
  
 


     this.service.getProjectList().
     subscribe(
         (data) =>{this.ProjectList = data;
           console.log(data)},
         (err) => {console.log(err)}
     );
  }

  conationfpay(event)
  { 
    if(event.checked == true)
    this.containfirst = true;
    else 
    this.containfirst = false;

    
    }
  durationType(value)
  {
     this.duration = value;

  }

  datepick(value)
  {
     this.calender = value;
  }
  raito()
  {
     if(this.first_pay == null)
      this.perface_ratio = 0;
     else if (this.project_amount == null)
      this.perface_ratio = 0 ; 
     else 
   this.perface_ratio =  (this.first_pay/100)*(this.project_amount);

   
  }
caldurationm(value)
{
   let days = this.startdate.getDay();
   let Month = this.startdate.getMonth();
   let Year = this.startdate.getFullYear();

   days+=1;

   Month += value;

   this.deliverdate = new Date(Year , Month , days);
   
    
   if(this.duration == 2){
    this.project_duration_days = Math.round(value*29.5);
    

   }

    
   if(this.duration == 3){
    
    this.project_duration_days = Math.round(value*30.4);
   }

}


openDialog(): void {
   const dialogRef = this.dialog.open(AddBuildingComponent, {
     width: '50%',
     height: '80%'
    
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     
   });
 }

caldurationd(value)
{
   let days = this.startdate.getDay();
   let Month = this.startdate.getMonth();
   let Year = this.startdate.getFullYear();
  
   
   days += Math.round( value %30.4 );    
   Month += Math.round(value/30.4);

   this.deliverdate = new Date(Year , Month , days);
  this.project_duration_h_months =  Math.round(value/29.5);
  this.project_duration_months = Math.round(value/30.4);
  

}
  nextStep() {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.startdate, format, locale);
    let startDateHiri = formatDate(this.startdate_hijri, format, locale);
    let deliverDate = formatDate(this.deliverdate, format, locale);
    let deliverDateHihri = formatDate(this.deliverdate_hijri, format, locale); 
    let segDate = formatDate(this.sig_date, format, locale); 
    let sdate = formatDate(this.stiuationdate, format, locale); 
     this.newProject={
        
        name : this.name ,
        proj_state:this.status,
        budget_year:this.budget_year ,
        proj_consultant:+this.consultant_name,
        contact_no:this.contact_number,
        proj_contractor:+this.contractor_name , 
        description:this.description ,
        first_pay : this.first_pay , 
        proj_duration_days :this.project_duration_days ,
        proj_duration_monthes : this.project_duration_months, 
        project_val:this.project_amount , 
        lantitude : this.lat ,
        longitude : this.lng ,
        delivery_date : deliverDate.toString() ,
        delivery_hijri_date : deliverDateHihri.toString(),
        first_pay_percentage : this.perface_ratio , 
        project_date : startDate.toString() ,
        project_hijri_date : this.from_hijri,
        project_type : this.type ,
        project_net : this.netcost,
        proj_number: this.proj_number,
        sig_date: segDate.toString() ,
        proj_situation : this.stiuation ,
        date_situation : sdate , 
        multi_qty_table : this.qty_type , 
        with_vat : this.with_vat


        
        }
        
     console.log(this.newProject);
     this.selectedIndex += 1;
  }
 
  IsChecked(val)
  {
    this.qty_type = val;
  }
  previousStep() {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let formattedDate = formatDate(this.startdate, format, locale);
   
   
   //   this.newProject={
   //    name : this.name ,
   //    proj_state:this.status,
   //    budget_year:this.budget_year ,
   //    proj_consultant:+this.consultant_name,
   //    contact_no:this.contact_number,
   //    proj_contractor:+this.contractor_name , 
   //    description:this.description ,
   //    first_pay : this.first_pay , 
   //    proj_duration :this.project_duration , 
   //    project_val:this.project_amount , 
   //    from_date : formattedDate.toString(),
   //    lantitude : this.lat ,
   //    longitude : this.lng ,
   // }
     this.selectedIndex -= 1;
  }   

   placeMarker(position: any) {
   this.lat = position.coords.lat;
   this.lng = position.coords.lng;
   this.newProject.lantitude = this.lat;
   this.newProject.longitude = this.lng;
   }
  SaveData()
  {
     console.log(this.newProject);
      this.service.createProject(this.newProject).subscribe(
         (data)=>{ console.log(data)} ,
         err=> {console.log(err);}
      );
     
  }

  ChooseVat(val)
  {
    console.log(val);
    this.with_vat = val;
  }
}
