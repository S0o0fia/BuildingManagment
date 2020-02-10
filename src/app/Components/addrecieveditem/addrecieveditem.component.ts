import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { RquestforRecieveItemsComponent } from '../rquestfor-recieve-items/rquestfor-recieve-items.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { Mirequest } from 'app/Models/MIR Request/mirequest';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { Matetrial } from 'app/Models/Material/matetrial';
import { Mirdata } from 'app/Models/MIR Request/mirdata';

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
  matrial : Mirdata[]=[];
  addmatrial : any[]=[];
  mat_name : string;
  mat_code : string;
  qty : string;
  mir: Mirequest;
  mirid  :number;
  matiral :Matetrial;
  getMIR: any=[];
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
  constructor(  public service : CoreService  
    ,private _snackBar: MatSnackBar
    , public dialogRef: MatDialogRef<RquestforRecieveItemsComponent>,
    @Inject(MAT_DIALOG_DATA)  private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      this.reqDate = new Date();
      this.lng=46.6753;
      this.lat=24.7136;
    }
  	
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition : 'center' ,
        panelClass: ['my-snack-bar']
      });
  
      return true;
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem()
  {
    this.matrial.push({
      code :this.mat_code ,
      name :this.mat_name,
      qty : +this.qty ,
   
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
   

     this.service.createMIR(this.mirrequest).subscribe(
      data=>{
      
        
        this.mirid = data['mir_id'] as number;
        
        this.matrial.forEach(element => {
          this.addmatrial.push({
            factory_id : this.facroty_id,
            material_id : element.code,
            name :element.name ,
            qty : this.qty ,
            mir_id : this.mirid,
            approved_qty : this.qty
            
          });
        
        });
          
       
  
        
 
 
      } , 
      err=> console.log(err)
    );

    if(this.addmatrial != null)
    {
      this.addmatrial.forEach(e=>{
        
        this.service.createMIRItem(e).subscribe(
          data=>{

           let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
           if(msg)
           {
             location.reload();
           }
           console.log(data)},
          err=>console.log(err)
        );
      });
      
    }

  // this.matrial.forEach(element=>{
  //   this.service.createMIRItem(element).subscribe(
  //     data=>console.log(data),
  //     err=>console.log(err)
  //   );
  // });

     
  }

}