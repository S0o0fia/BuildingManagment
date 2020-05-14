import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
import { Extract } from '../../Models/Extract/extract';
import { formatDate } from '@angular/common';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'ms-add-extract',
  templateUrl: './add-extract.component.html',
  styleUrls: ['./add-extract.component.scss']
})
export class AddExtractComponent implements OnInit {
  minDate : Date;
  maxDate : Date;
  extract_number : string;
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
  projectname : string;
  public rowSelected : any = -1;
  ApprovedCountItem : any =[];
  added : boolean = false;
  discount : any = [];
  from_extract_date :string ;
  to_extract_date : Date =  new Date()  ;
  invoice_type : string = 'current';
  itemIds: any[]=[];
  myControl = new FormControl();
  filteredIds: Observable<string[]>;
 
  openCloseRow(id): void
 {
    this.rowSelected = this.rowSelected == -1 ? id : -1;
    console.log(this.ApprovedCountItem);
  }

  constructor( private dialog: MatDialog , public service : CoreService , private router : Router , 
    public _snackBar : MatSnackBar) { 
      this.projectname = localStorage.getItem('projectname');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectid = +localStorage.getItem('projectid');
 
     this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
  }

  ngOnInit() {
    this.service.getInvoiceName().subscribe(
      data=> {
        this.extract_number = data[0].sequence;
        this.from_extract_date = data[0].date_from ; 
      },
      err=>console.log(err)
    );

   
  }

  private _filter(value: string): string[] {
    this.itemIds=[];
    const filterValue = value.toLowerCase();
    this.approve.forEach(element=>
      {
       this.itemIds.push({"number":element.number,"name":element.name,"quantity_id":element.quantity_id});
      });
    return this.itemIds.filter(option => option.number.toLowerCase().includes(filterValue));
  }

  openDialogItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '75%',
      height: '70%',

     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  type(val)
  {
    this.invoice_type = val;
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
      project_id : this.projectid , 
      total_discount : this.total_discount , 
      total_excuted : this.total_work,
      total_price: this.Net_amout ,
      invoice_type : this.invoice_type
    };
    console.log(this.ext)
    this.service.createInvoice(this.ext).subscribe(
      data=>{
        this.extract_id = data['invoice_id'];
        console.log(this.extract_id);
        this.discount.forEach(e => {
          this.service.createInvoiceDiscount({
            name : e['discount'] , 
            total : e['amount'] , 
            project_invoice_id : this.extract_id
          }).subscribe(
            data=>{
              this.ApprovedCountItem.forEach(e2 => {
                this.service.createInvoiceitem({
                  approved_qty : e2.approved_qty , 
                  extract_id : this.extract_id , 
                  item_name : e2.name , 
                  item_number : e2.number , 
                  p_approved_qty : e2.p_approved_qty , 
                  price : e2.price , 
                  qty : e2.qty
                }).subscribe(
                  data=> {
                    let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
                    if(msg)
                    {
                     this.router.navigate(['/home/abstracts']);
                    }
                  } , 
                  err=>console.log(err)
                )
              });
              


            } , 
            err=>console.log(err)

          );
          
        });
       
      } ,
      err => console.log(err)
    );
    

  } 


 Add(id)
 {
   //alert(id);
  this.approved=[];
  this.ApprovedCountItem=[];
    this.approve.forEach(element=>
    {
      if(element.quantity_id == id)
      {
        this.approved.push(element);
        this.total_work += (element.price * element.approved_qty);
        this.Net_amout = this.total_work-this.total_discount;
        this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
      }

    });   
    console.log(this.approved);

 }

 Adddiscount()
 {
    
      this.dis_amount = this.total_discount;
    
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

 removeitem(index)
 {
  
    this.total_work -= (this.approved[index].price *this.approved[index].approved_qty); 
    this.Net_amout = this.total_work-this.total_discount;
    this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
    this.approved.splice(index , 1);
 }


  openDialogDiscount(): void {
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      width: '70%',
      height: '70%',
     
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  getCountItem(event , item_number , count_id)
  {
    debugger
    if(event.checked)
    {
      this.approved.forEach(element => {
        if(element.item_number == item_number)
        {
          this.ApprovedCountItem.forEach(element2 => {
               if(element2.count_id == count_id)  
               { 
                 element2.approved_qty += element.approved_qty;
                 this.added = true;
               }
                 
          });     

          if(this.added == false)
          {
            this.ApprovedCountItem.push(element);
          }
        }
      });
    }
    else{
      this.ApprovedCountItem=[];
    }
    console.log(this.ApprovedCountItem);
  }
  AddDiscount()
  {
     this.discount.push({
       discount : this.discounts , 
       amount : this.dis_amount
     });

     this.total_discount += this.dis_amount;
     this.Net_amout -= this.dis_amount;
     this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
  }
  removediscount(index)
{
  this.total_discount -= this.discount[index].amount;
  this.Net_amout += this.discount[index].amount;
  this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
  this.discount.splice(index , 1);
  
}
to_exDate : string;
showItems()
{
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    let from_exDate = formatDate(this.from_extract_date, format, locale);
    this.to_exDate = formatDate(this.to_extract_date, format, locale);
    let projectid = localStorage.getItem('projectid');
    this.service.getApprovedQty(projectid , from_exDate , this.to_exDate).subscribe(
      data =>{ 
     this.approve = data as any ;
     console.log(data);
     this.filteredIds = this.myControl.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
     },
       err=> console.log(err)

   );

}
}
