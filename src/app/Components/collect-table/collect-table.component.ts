import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { Count } from 'app/Models/Count/count';
import { Countitem } from 'app/Models/Count/countitem';
import { Router } from '@angular/router';

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
  qty_width : number=0;
  qty_length : number=0; 
  qty_height : number=0;
  approved_height : number=0;
  approved_length : number=0;
  approved_width : number=0;
  item_number : string;
  item_name : string;
  unit : string;

  approves : any = [];
  constructor(public service : CoreService , public router : Router) 
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
  BindItemnumber(item_number ,id , unit)
  {
    this.item_number = item_number ; 
    this.item_id = id;
    this.unit = unit;
  }

  BindItemname(item_name , id , unit)
  {
    this.item_name = item_name;
    this.item_id = id;
    this.unit = unit;
  }

  Item(val)
  {
    this.item_id = val;
  }

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
       
          this.RFI_Location.forEach(element => {
              if(element['rfi_id'] == val)
              {
                if(element['invoiced']==false)
                {this.Location.push(element);}
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
                if(i != 0)
                this.Location.splice(0  , i);
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
    this.Location.splice(0  , index);
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
            approved_qty : this.approve ,
            count_id : this.count_id , 
            location : element.name ,
            location_id : element.id,
            name : "" ,
            qty : this.qty , 
            approved_height : this.approved_height , 
            approved_length : this.approved_length , 
            approved_width : this.approved_width , 
            qty_height : this.qty_height , 
            qty_length : this.qty_length , 
            qty_width : this.qty_width
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
  calQty()
  {
    this.qty = this.qty_height*this.qty_length*this.qty_width;
  }
  calApprove()
  {
    this.approve = this.approved_height*this.approved_length*this.approved_width;
  }
   
 
}
