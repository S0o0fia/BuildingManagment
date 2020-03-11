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
  BindItemnumber( item_number, id, unit, dimension, description)
  {
    debugger;
    //this.item_number=null;
    this.item_number = item_number ; 
    this.item_id = id;
    this.unit = unit;
    this.dimension=dimension;
    this.description=description;
  }

  BindItemname( item_name , id , unit, dimension, description)
  {
    debugger;
    //this.item_name=null
    this.item_name = item_name;
    this.item_id = id;
    this.unit = unit;
    this.dimension=dimension;
    this.description=description;
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
      debugger;
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
      debugger;
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
            //approved_qty : this.approve ,
            count_id : this.count_id , 
            location : element.name ,
            location_id : element.id,
            //name : "" ,
            qty : this.qty , 
            // approved_height : this.approved_height , 
            // approved_length : this.approved_length , 
            // approved_width : this.approved_width , 
            qty_height : this.dimension>2 ? this.qty_height : 0, 
            qty_length : this.qty_length , 
            qty_width : this.dimension>1 ? this.qty_width : 0,
            description:this.description,
            qty_unit : this.mNumber,
            qty_pers : this.percentage
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
    debugger;
    if(this.dimension==1){
      this.qty = this.qty_length*this.mNumber;
    }
    else if(this.dimension==2){
      this.qty = this.qty_length*this.qty_width*this.mNumber;
    }
    else{
      this.qty = this.qty_height*this.qty_length*this.qty_width*this.mNumber;
    }
    
    this.calpercentage();
  }
  calApprove()
  {
    this.approve = this.approved_height*this.approved_length*this.approved_width;
  }
   calpercentage(){
    debugger;
     this.percentage=this.qty/100;
   }
 
}
