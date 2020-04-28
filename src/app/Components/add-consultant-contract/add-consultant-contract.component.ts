import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { Consulantcontract } from 'app/Models/consutlantcontract/consulantcontract';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { ContractstableComponent } from '../contractstable/contractstable.component';

@Component({
  selector: 'ms-add-consultant-contract',
  templateUrl: './add-consultant-contract.component.html',
  styleUrls: ['./add-consultant-contract.component.scss']
})
export class AddConsultantContractComponent implements OnInit {
  users : any [] = [];

  //binding 
  consultant : number;
  contract_value : number;
  contract_number : number;
  tod : Date;
  fromd:Date;
  description : string;
  minDate : Date;
  maxDate : Date ;
  contract_name : string;
  days : number;
  monthes : number;
  duration_type : number = 0;
  //new contract 
  newContract : Consulantcontract;
  constructor(public service : CoreService , public dialogRef: MatDialogRef<ContractstableComponent> , 
    private _snackBar: MatSnackBar) {
    dialogRef.disableClose = true;
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
 
  }

  ngOnInit() {
    this.service.getUsers().subscribe(
      data=>{ 
        data.forEach(e=>
          {
            if(e.user_job == "consultant")
            {
              this.users.push(e);
            }
          });

      }, 
      err=> console.log(err)
    );
  }

  Save()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.fromd, format, locale);
    let endDate = formatDate(this.tod, format, locale);

         this.newContract = {
           consultant_id : this.consultant , 
           contract_value : this.contract_value , 
           description : this.description ,
           from_date : startDate , 
           to_date : endDate , 
           name : this.contract_number.toString()          
         }

         this.service.createConsultantContract(this.newContract).subscribe(
           data=>{
             this._snackBar.open('تم إنشاء العقد بنجاح' , 'إلغاء');
             location.reload();
           } , 
           err=> console.log(err)
         );
  }

  duration(val)
  {
    this.duration_type = val;
  
  }
  durationd()
  {
    let day = this.fromd.getDay();
    let months = this.fromd.getMonth();
    let year = this.fromd.getFullYear();
    
    if(this.duration_type == 1)
    {
     day += Math.round( this.days %30)-2;    
     months += Math.round(this.days/30);
  
    }
    else if( this.duration_type == 2)
    {
      day -= 2;
      months += this.monthes;
    
     
    }
 
    this.tod = new Date(year , months, day)
  }

}
