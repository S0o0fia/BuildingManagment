import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CoreService } from 'app/service/core/core.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from 'app/Models/Project/new-project';
import { PageTitleService } from '../core/page-title/page-title.service';
import { ProjectModel } from 'app/Models/Project/project-model';
import { DatePipe, formatDate } from '@angular/common';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { MatDialog } from '@angular/material';

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
  deliverdate : Date = new Date()  ;
  deliverdate_hijri : Date = new Date();
  type : string="";
  proj_number: string = "";
  sig_date : Date = new Date();
 

  constructor( private pageTitleService: PageTitleService,
               
               private translate : TranslateService , public service : CoreService
                , public fb: FormBuilder , private dialog: MatDialog) {

                  this.minDate = new Date(1900,1,1);
                  this.maxDate = new Date(2050,1,1);

                  this.lng=46.6753;
                  this.lat=24.7136;
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
   this.perface_ratio =  (this.first_pay/this.project_amount)*100;
  }
caldurationm(value)
{
   let days = this.startdate.getDay();
   let Month = this.startdate.getMonth();
   let Year = this.startdate.getFullYear();
   days+=1;
   Month += value;
   this.deliverdate = new Date(Year , Month , days);
   this.deliverdate_hijri = new Date(Year , Month , days);
   this.project_duration_days = value*30;

  
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
   Month += Math.round(value/30);
   days += value%30+1;
   this.deliverdate = new Date(Year , Month , days);
   this.deliverdate_hijri = new Date(Year , Month , days);
   this.project_duration_months= value/30;

}
  nextStep() {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.startdate, format, locale);
    let startDateHiri = formatDate(this.startdate_hijri, format, locale);
    let deliverDate = formatDate(this.deliverdate, format, locale);
    let deliverDateHihri = formatDate(this.deliverdate_hijri, format, locale); 
    let segDate = formatDate(this.sig_date, format, locale); 
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
        project_hijri_date : startDateHiri.toString(),
        project_type : this.type ,
        project_net : this.netcost,
        proj_number: this.proj_number,
        sig_date: segDate.toString()


        
        }
        
     console.log(this.newProject);
     this.selectedIndex += 1;
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
}
