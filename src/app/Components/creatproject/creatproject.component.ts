import { Component, OnInit, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/service/core/core.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NewProject } from 'app/Models/Project/new-project';
import { PageTitleService } from '../core/page-title/page-title.service';
import { ProjectModel } from 'app/Models/Project/project-model';
import { DatePipe, formatDate, CurrencyPipe } from '@angular/common';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MatSnackBar, MatHorizontalStepper } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/Service/custompipe/format-datepicker';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n 
} from '@ng-bootstrap/ng-bootstrap';
const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];
@Component({
  selector: 'ms-creatproject',
  templateUrl: './creatproject.component.html',
  styleUrls: ['./creatproject.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    // {provide: APP_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    //for Hijri Calender 
    {provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura},
    {provide: NgbDatepickerI18n, useClass: CreatprojectComponent}
  ]
})


export class CreatprojectComponent  extends NgbDatepickerI18n  implements OnInit  {

//    longitude = 20.728218;
// latitude = 52.128973;

// markers = [
// { latitude: 52.228973, longitude: 20.728218 }
// ];


// this.markers.push({ latitude: lat, longitude: lng });}
  model: NgbDateStruct;
  model2 : NgbDateStruct;
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
  startdate_hijri : Date;
  startdate:Date;
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
  deliverdate2 : string = "";
  deliverdate : Date;
  deliverdate_hijri : Date;
  type : string="";
  proj_number: string = "";
  sig_date : Date; 
  stiuationdate : Date=new Date();
  uploader: FileUploader = new FileUploader({url: ''});
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  from_hijri : string="";
  qty_type : boolean;
  with_vat : boolean = false;
  containfirst : boolean = false;
  today = this.calendar.getToday();
  today2 = this.calendar2.getToday();
    formattedAmount: string = '';
    base64 : any ;
    filename :string ;
    files : FileList;
  createForm: FormGroup;
    
  
    onSelectFiles(evt) {
  
    this.files = evt.target.files;
    //console.log(this.files);
   
   
     }
   
    

  constructor( private pageTitleService: PageTitleService, private formatPipe: NumberFormatPipe,
               private _snackBar: MatSnackBar ,
               private translate : TranslateService , public service : CoreService ,
               private calendar: NgbCalendar ,     private calendar2: NgbCalendar ,
                 public fb: FormBuilder , private dialog: MatDialog,private currencyPipe:CurrencyPipe) {
                 super();
                  this.minDate = new Date(1900,1,1);
                  this.maxDate = new Date(2050,1,1);
                  this.deliverdate = null;
                  this.lng=46.6753;
                  this.lat=24.7136;
<<<<<<< HEAD
                  this.qty_type = false;   
                               
               }

=======
                  this.qty_type = false;  
                  this.addForm();               
               }

    addForm() 
    {
      this.createForm = this.fb.group({
        Name: ['', Validators.compose([Validators.required])],
        Contact: ['', Validators.compose([Validators.required])],
        Consultant: ['', Validators.compose([Validators.required])],
        Contractor: ['', Validators.compose([Validators.required])],
        ProjectAmount: ['', Validators.compose([Validators.required])],
      });
    }
>>>>>>> e53c1113aa97575616af945d239e917a171e29bd

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
         (err) => {console.log(err) ; 
        
        
        }
     );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition : 'center' ,
      panelClass: ['my-snack-bar']
    });
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

  transformAmount(element){
    this.formattedAmount = this.currencyPipe.transform(this.project_amount , "   ر.س");
    // Remove or comment this line if you dont want to show the formatted amount in the textbox.
    element.target.value = this.formattedAmount;
}


caldurationm(value)
{
  //  let days = this.startdate.getDay();
  //  let Month = this.startdate.getMonth();
  //  let Year = this.startdate.getFullYear();

  //  let daysh = this.model.day;
  //  let Monthh = this.model.month;
  //  let Yearh = this.model.year
  const format = 'dd/MM/yyyy';
  const locale = 'en-US';
  let startDate = formatDate(this.startdate, format, locale);
   if(this.duration == 2){
    
    this.service.getDliverDate( startDate , value , 'hijri').subscribe(
      data=>{this.deliverdate = new Date( data['delivery_date']);},
      err=>console.log(err)
    )
  
    
  }
    
   if(this.duration == 3){
    
      this.service.getDliverDate( startDate , value , 'months').subscribe(
      data=>{this.deliverdate = new Date( data['delivery_date']); },
      err=>console.log(err)
    )
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
  const format = 'dd/MM/yyyy';
  const locale = 'en-US';
  let startDate = formatDate(this.startdate, format, locale);

 this.service.getDliverDate(startDate , value , 'days').subscribe(
   data=>{this.deliverdate = new Date( data['delivery_date']); ; console.log(this.deliverdate) },
   err=>console.log(err)
 )

}
  nextStep() {
    this.from_hijri = this.model.day+"/"+this.model.month+"/"+this.model.year;
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.startdate, format, locale);
    this.startdate_hijri=this.startdate;
    let startDateHiri = formatDate(this.startdate_hijri, format, locale);
    let deliverDate = formatDate(this.deliverdate, format, locale);
    this.deliverdate_hijri=this.startdate;
    let deliverDateHihri = formatDate(this.deliverdate_hijri, format, locale); 
    let segDate = formatDate(this.sig_date, format, locale); 
    let sdate = formatDate(this.stiuationdate, format, locale); 
    if(this.first_pay == undefined) this.first_pay = 0 ;
    if(this.perface_ratio == undefined) this.perface_ratio =0;
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
     debugger;
     this.selectedIndex += 1;
  }
 
  IsChecked(val)
  {
    this.qty_type = val;
  }
  previousStep() {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    let formattedDate = formatDate(this.startdate, format, locale);
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
   debugger;
     console.log(this.newProject);
      this.service.createProject(this.newProject).subscribe(
         (data)=>{ 
           console.log(data) ; 
           for (let index = 0; index < this.files.length; index++) {
         
            let me =this;
            let reader = new FileReader();
            reader.readAsDataURL(this.files[index]);
            reader.onload = function () {
             me.service.UploadFile2(me.files[index].name , reader.result.toString() , data['project_is']).subscribe(
               data=> console.log(data) ,
               err=>console.log(err) )
             }
               reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          
            
          } 
         
          this.selectedIndex +=1;
        } ,
         err=> {console.log(err); 
          let msg = this.openSnackBar(err.error.msg, "إالغاء" );
        }
      );
     
  }

  ChooseVat(val)
  {
    console.log(val);
    this.with_vat = val;
  }


  //for hjri calender
  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return '${date.day}-${date.month}-${date.year}';
  }
}
