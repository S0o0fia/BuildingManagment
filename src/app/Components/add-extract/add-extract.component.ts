import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
import { Extract } from '../../Models/Extract/extract';
import { formatDate } from '@angular/common';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';

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
      data=> this.extract_number = data[0].sequence,
      err=>console.log(err)
    );

    this.service.getApproveQty().subscribe(
       data => this.approve = data as any ,
        err=> console.log(err)

    );
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

  AddExtract()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let exDate = formatDate(this.extract_date, format, locale);
    
    this.ext= {
      Total_vat : this.total_Vat ,
      date : exDate ,
      name : this.extract_number ,
      paid : this.paid , 
      project_id : this.projectid , 
      total_discount : this.total_discount , 
      total_excuted : this.total_work,
      total_price: this.Net_amout
    };
    this.service.createInvoice(this.ext).subscribe(
      data=>{
        this.extract_id = data['invoice_id'];
         
        let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
                        if(msg)
                        {
                         this.router.navigate(['/home/abstracts']);
                        }


       
      } ,
      err => console.log(err)
    );
    

  } 


 Add(id)
 {
    this.approve.forEach(element=>
    {
      if(element.id == id)
      {
        this.approved.push(element);
        this.total_work += (element.price * element.approved_qty);
        this.Net_amout = this.total_work-this.total_discount;
        this.total_Vat = (this.Net_amout)+(this.Net_amout*0.05);
      }

    });



   

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
}
