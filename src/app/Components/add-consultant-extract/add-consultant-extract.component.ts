import { Component, OnInit } from '@angular/core';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { CoreService } from 'app/Service/core/core.service';
import { Extract } from 'app/Models/Extract/extract';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ms-add-consultant-extract',
  templateUrl: './add-consultant-extract.component.html',
  styleUrls: ['./add-consultant-extract.component.scss'] ,
  animations: [
    trigger('fade', [
       state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ],  
})
export class AddConsultantExtractComponent implements OnInit {
  extractname : any[]=[];
  contract_id : number;
  extract_number : string ;
  invoice_type : string = "current";
  from_extract_date : string ;
  to_extract_date : Date;
  minDate : Date;
  maxDate : Date;  
  extract_date : Date = new Date();
  total_work : number = 0;
  discounts : string = "";
  total_discount : number = 0;
  Net_amout : number = 0;
  total_Vat : number = 0;
  paid : number = 0;
  ext: Extract ;
  projectid : number;
  item_id : number;
  extract_id : number;
  approve: any[]=[];
  approved: any[]=[];
  dis : number = 0;
  dis_amount : number = 0;
  public rowSelected : any = -1;
  ApprovedTimeSheet : any[] =[];
  added : boolean = false;
  discount : any = [];
  qty : any[]=[];
  Approved_qty : any[]=[];
  
  constructor(public service : CoreService , public openSnackBar : MatSnackBar , public router : Router ) {
    this.contract_id = + localStorage.getItem('contract_id');
    
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
   }

  ngOnInit() {
    this.service.getConsultantInvoicesName(this.contract_id).subscribe(
      data=>{
        this.extractname = data ;
        this.extract_number = this.extractname[0].sequence ; 
        this.from_extract_date = this.extractname[0].date_from;
      },
      err=>console.log(err)
    )
  }

  showItems()
  { 

    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let from_exDate = formatDate(this.from_extract_date, format, locale);
    let to_exDate = formatDate(this.to_extract_date, format, locale);
    
    this.service.getApprovedTimesheet(from_exDate , to_exDate , this.contract_id ).subscribe(
      data=> {
        this.ApprovedTimeSheet = data as any 
        console.log(data)
      },
      err=>console.log(err)
    )

  }


  getQty(event , position_id , timesheet_id)
  {
    if(event.checked)
    {
     this.service.getConsultantqty().subscribe(
       data=>{
        console.log(data)
         data.forEach(e=>
          {
            if(e.id == position_id)
            { this.qty.push(e);
              this.Approved_qty.push({
                qty : e.qty , 
                approved_qty : e.qty ,
                item_name : e.name , 
                item_number : e.contract_number , 
                p_approved_qty : e.qty ,
                price : e.price ,
                timesheet_id : timesheet_id
              })
              this.total_work += e.qty * e.price ;
              this.Net_amout = this.total_work-this.total_discount;
              this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);

              
            }
          }
          
         )
   
    
       } , 
       err=>console.log(err)
     )
    }
 }

 removeitem(i)
 {
 
  this.total_work = this.total_work-(this.qty[i].qty * this.qty[i].price)  
  this.Net_amout = this.total_work-this.total_discount;
  this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
  this.qty.splice(i , 1);
 }

 AddDiscount()
 {
  this.total_discount +=this.dis_amount;
  this.Net_amout = this.total_work-this.total_discount;
  this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05); 
   this.discount.push({
     discount : this.discounts , 
     amount : this.dis_amount
   })
 }

 removediscount(index)
 {
  this.total_discount -= this.discount[index].amount;
  this.Net_amout += this.discount[index].amount;
  this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05); 
  this.discount.splice(index ,1 );
  
 }

 AddExtract()
 {
   const format = 'MM/dd/yyyy';
   const locale = 'en-US';
   let from_exDate = formatDate(this.from_extract_date, format, locale);
   let to_exDate = formatDate(this.to_extract_date, format, locale);
   
   this.ext= {

     Total_vat : this.total_Vat ,
     date_from : from_exDate ,
     date_to : to_exDate ,
     name : this.extract_number ,
     paid : this.paid , 
     project_id : this.contract_id , 
     total_discount : this.total_discount , 
     total_excuted : this.total_work,
     total_price: this.Net_amout ,
     invoice_type : this.invoice_type
   };
   console.log(this.ext)
   this.service.createConsultantInvoices(this.ext).subscribe(
     data=>{
       this.extract_id = data['invoice_id'];
       console.log(this.extract_id);
       if(this.discounts.length == 0)
       {
        this.Approved_qty.forEach(e2 => {
          this.service.createConsultantInvoiceitem({
            approved_qty : e2.approved_qty , 
            extract_id : this.extract_id , 
            item_name : e2.item_name , 
            item_number : e2.item_number , 
            p_approved_qty : e2.p_approved_qty , 
            price : e2.price , 
            qty : e2.qty
           
          } , e2.timesheet_id).subscribe(
            data=> {
              let msg = this.openSnackBar.open('تم إضافة مستخلص استشاري', 'إلغاء');
              if(msg)
              {
                this.router.navigate(['/home/ExtractConsultant' , this.contract_id])
              }  }) 
            });
                    

       }
       else {
        this.discount.forEach(e => {
          this.service.createConsultantDiscount({
            name : e['discount'] , 
            total : e['amount'] , 
            project_invoice_id : this.extract_id
          }).subscribe(
            data=>{
              this.Approved_qty.forEach(e2 => {
                this.service.createConsultantInvoiceitem({
                  approved_qty : e2.approved_qty , 
                  extract_id : this.extract_id , 
                  item_name : e2.item_name , 
                  item_number : e2.item_number , 
                  p_approved_qty : e2.p_approved_qty , 
                  price : e2.price , 
                  qty : e2.qty
                 
                } , e2.timesheet_id).subscribe(
                  data=> {
                    let msg = this.openSnackBar.open('تم إضافة مستخلص استشاري', 'إلغاء');
                    if(msg)
                    {
                      this.router.navigate(['/home/ExtractConsultant' , this.contract_id])
                    }
 
                  } , 
                  err=>console.log(err)
                )
              });
              
 
 
            } , 
            err=>console.log(err)
 
          );
          
        });
       }
       
      
     } ,
     err => console.log(err)
   );
   

 } 




}
