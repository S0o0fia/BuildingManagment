import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { Count } from 'app/Models/Count/count';
import { Countitem } from 'app/Models/Count/countitem';
import { Router } from '@angular/router';
import { CountdetailsComponent } from '../countdetails/countdetails.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ms-collect-table',
  templateUrl: './collect-table.component.html',
  styleUrls: ['./collect-table.component.scss']
})
export class CollectTableComponent implements OnInit {

  minDate : Date;
  maxDate : Date ;
  items : any = [];
  fromd : Date = new Date();
  tod : Date= new Date();
  item_id : number;
  RFI : any= [];
  RFI_Location : any =[];
  Location : any[] =[];
  approve : number = 0;
  counts : Count  ;
  project_id : number;
  CountItems : Countitem [] =[];
  count_id : number; 
  qty : number ;
  projectname : string;
  qty_width : number;
  qty_length : number; 
  qty_height : number;
  approved_height : number;
  approved_length : number;
  approved_width : number;
  item_number : string;
  item_name : string;
  unit : string;
  mNumber : number=1;
  percentage : number;
  dimension : number;
  description : string;
  editRowIndex: number = -1;
  approves : any = [];
  request_number : number;
  constructor(public dialogRef: MatDialogRef<CountdetailsComponent> ,
    public service : CoreService , public router : Router) 
  {

    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
    this.project_id = +localStorage.getItem('projectid');
    this.projectname = localStorage.getItem('projectname');
   }

  ngOnInit() {
    this.service.getQty_tbl().subscribe(
      data=> this.items = data,
      err=>console.log(err)
    )
    
  
    
  }
  BindItemnumber( item_number, id, unit, dimension)
  {
    debugger;
    //this.item_number=null;
    this.item_number = item_number ; 
    this.item_id = id;
    this.unit = unit;
    this.dimension=dimension;
  }

  BindItemname( item_name , id , unit, dimension)
  {
    debugger;
    //this.item_name=null
    this.item_name = item_name;
    this.item_id = id;
    this.unit = unit;
    this.dimension=dimension;
  }

  Item(val)
  {
    this.item_id = val;
  }
//   onEdit(index: number,eve) {
//     debugger;
//     this.editRowIndex = index;
//     this.Location[index]["Number"] = this.mNumber + eve.key;
// }
  ShowRFI()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.fromd, format, locale);
    let endDate = formatDate(this.tod, format, locale);
    this.service.getRFIwithItemFilter(this.item_id , startDate , endDate).subscribe(
      data=> this.RFI = data ,
      err=> console.log(err)
    );
  }

  getRFIid(isChecked , val  , i)
  {
    
    if(isChecked.checked)
    {
      this.service.getItemRFI().subscribe(
        data=> {
          this.RFI_Location = data;
       debugger;
          this.RFI_Location.forEach(element => {
              if(element['rfi_id'] == val)
              {
                if(element['invoiced']==false)
                {
                  debugger;
                  this.Location.push(element);
                }
              }
          });
        },
        err=>console.log(err)
      );
    }
    else if(!isChecked.checked){
      this.service.getItemRFI().subscribe(
        data=> {
          this.RFI_Location = data;
       
          this.RFI_Location.forEach(element => {
              if(element['rfi_id'] == val)
              {
                debugger;
                if(i != 0)
                this.Location.splice(i  , 1);
                else
                this.Location.pop();
                  
              }
          });
        },
        err=>console.log(err)
      );
    }
  }

  delete(index)
  {
    if(index != 0)
    this.Location.splice(index, 1);
    else
    this.Location.pop();
  }

  Add(event)
  {
      console.log(event.target.value);
  }

  AddCount()
{  
    
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.fromd, format, locale);
    let endDate = formatDate(this.tod, format, locale);
    
    this.counts = {
      fromdate  : startDate , 
      projectid : this.project_id , 
      qunatity_id : this.item_id ,
      todate : endDate

    }
    this.service.createCount(this.counts).subscribe(
      data=> {
        this.count_id = data['count_id'] as number;
        this.Location.forEach(element => {
  
        
          this.CountItems.push({
            //approved_qty : this.approve ,
            count_id : this.count_id , 
            location : element.name ,
            location_id : element.id,
            //name : "" ,
            qty : element.qty , 
            // approved_height : this.approved_height , 
            // approved_length : this.approved_length , 
            // approved_width : this.approved_width , 
            qty_height : this.dimension>2 ? element.qty_height : 0, 
            qty_length : element.qty_length , 
            qty_width : this.dimension>1 ? element.qty_width : 0,
            description:element.description,
            qty_unit : element.Number,
            qty_pers : element.percentage
          })
       
        });
      

        this.CountItems.forEach(element => {
          this.service.createcountItem(element).subscribe(
            data=>{
               console.log(data)
             
               location.reload();
              } , 
            err=> console.log(err)
          );
        });
    
       
      } , 
      err=> console.log(err)
    );

  
  
  } 
  calQty(i)
  {
    debugger;
    i.qty=0;
    if(this.dimension==1){
      i.qty = (i.qty_length*i.Number)*i.percentage/100;
    }
    else if(this.dimension==2){
      i.qty = (i.qty_length*i.qty_width*i.Number)*i.percentage/100;
    }
    else{
      i.qty = (i.qty_height*i.qty_length*i.qty_width*i.Number)*i.percentage/100;
    }
    
    //this.calpercentage(i);
  }
  calApprove()
  {
    this.approve = this.approved_height*this.approved_length*this.approved_width;
  }
   calpercentage(i){
    debugger;
    i.qty_pers=0;
     i.percentage=i.qty/100;
   }
 
}
