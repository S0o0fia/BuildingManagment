import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RquestforRecieveItemsComponent } from '../rquestfor-recieve-items/rquestfor-recieve-items.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { Mirequest } from 'app/Models/MIR Request/mirequest';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { Matetrial } from 'app/Models/Material/matetrial';

@Component({
  selector: 'ms-addrecieveditem',
  templateUrl: './addrecieveditem.component.html',
  styleUrls: ['./addrecieveditem.component.scss']
})
export class AddrecieveditemComponent implements OnInit {


  minDate : Date;
  maxDate : Date;
  reqDate : Date;
  lng : number;
  lat:number;
  mirrequest : any=[];
  reqCode : string;
  facroty_id : string;
  matrial : any[]=[];
  mat_name : string;
  mat_code : string;
  qty : string;
  mir: Mirequest;
  mirid  :number;
  matiral :Matetrial;
;
  hi(val , code)
  {
     this.facroty_id = val;
     this.reqCode = code;
    console.log(this.facroty_id);
  }
  addmat ( code , name)
  {
    this.mat_name = name;
    this.mat_code = code;
  }
  placeMarker(position: any) {
   this.lat = position.coords.lat;
   this.lng = position.coords.lng;
   }
  constructor(  public service : CoreService  , public dialogRef: MatDialogRef<RquestforRecieveItemsComponent>,
    @Inject(MAT_DIALOG_DATA)  private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      this.reqDate = new Date();
      this.lng=46.6753;
      this.lat=24.7136;
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem()
  {
    this.matrial.push({
      code :this.mat_code ,
      name :this.mat_name,
      qty : this.qty ,
   
    });
  }
 
  removeitem(index)
  {
    this.matrial.splice(index , 1);
  }
  ngOnInit() {
    this.service.getMIRequest().subscribe(
      data => {
           this.mirrequest = data;
           
          
         
      },
      err => console.log(err)
    ); 

    
  } 
  
  Save()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startdate= formatDate(this.reqDate, format, locale);
   
    this.mirrequest = {
         name : this.reqCode,
        request_date : startdate
     }
   

  //  this.service.createMIR(this.mirrequest).subscribe(
  //    data=>{
  //      this.mirid = data['mirid'] as number;
  //      this.matrial.forEach(element => {
  //       this.matrial.push({
  //         factory_id : this.facroty_id,
  //         material_id : element.code,
  //         qty : this.qty ,
  //         mir_id : this.mirid,
  //         approved_qty : this.qty
          
  //       });
  //       console.log(this.matrial);
  //      });
  //    } , 
  //    err=> console.log(err)
  //  );
     
  }

}