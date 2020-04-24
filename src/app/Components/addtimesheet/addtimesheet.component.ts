import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialogConfig, MatSnackBar, MatDialogRef } from '@angular/material';
import { formatDate } from '@angular/common';
import { RequestfortimesheetComponent } from '../requestfortimesheet/requestfortimesheet.component';

@Component({
  selector: 'ms-addtimesheet',
  templateUrl: './addtimesheet.component.html',
  styleUrls: ['./addtimesheet.component.scss']
})
export class AddtimesheetComponent implements OnInit {
   users : any []=[];
   project  : any []=[];
   jobtitles : any []=[];
   qunatity : any[]=[];
   qulification : any[]=[];

   //binding 
   user : number;
   project_id : number;
   jobtitle : number;
   tod : Date ; 
   fromd : Date;
   minDate : Date;
   maxDate : Date;
   description : string;
   qty : number;
   contract_id : number;
   qualification : number;
 
  constructor(public services : CoreService , public _snackbar : MatSnackBar , 
    public dialogRef: MatDialogRef<RequestfortimesheetComponent> ) {
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
    this.contract_id = +localStorage.getItem('contract_id');
    this.dialogRef.disableClose = true;
   }

  ngOnInit() {
    this.services.getUsers().subscribe(
      data=> {
      
        data.forEach(e => {
        if(e.consultant_emp == true)
        {
          this.users.push(e);
        }
      })} , 
      err=> console.log(err)
    );

    this.services.getProjectList().subscribe(
      data => {this.project = data as any[]} , 
      err=> console.log(err)
    )


    this.services.getSpeclization().subscribe(
      data=> this.jobtitles = data as any[] , 
      err => console.log(err)
    )

    this.services.getConsultantqty().subscribe(
      data=> {
        
        this.qunatity = data as any[]} , 
      err=> console.log(err)
    )

    this.services.getQualifications().subscribe(
      data=>this.qulification = data as any[], 
      err=> console.log(err)
    )
  }

  Save()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.fromd, format, locale);
    let endDate = formatDate(this.tod, format, locale);

    this.services.createTimesheet({
      contract_id : this.contract_id , 
      description :this.description , 
       from_date : startDate , 
       position_id : this.qty , 
       project_id : this.project_id , 
       specialty_id : this.jobtitle , 
       to_date : endDate ,
       user_name : this.user,
       qualification_id : this.qualification
    }).subscribe(
      data=>{
        this._snackbar.open('تم الإضافة بنجاح','إلغاء');
       location.reload();
      }, 
      err=> console.log(err)
    )
    
  }


}
