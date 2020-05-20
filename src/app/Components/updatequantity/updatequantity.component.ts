import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quantity } from 'app/Models/Quantity/quantity';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { QuantitytableComponent } from '../quantitytable/quantitytable.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ms-updatequantity',
  templateUrl: './updatequantity.component.html',
  styleUrls: ['./updatequantity.component.scss']
})
export class UpdatequantityComponent implements OnInit {subscription : Subscription;
  browserRefresh = false;
 minDate : Date;
 maxDate : Date;
 Mainsection : any;
 mainid : any = null;
 workid : any = null;
 subid : any = null;
 Unit : any ;
 unitid : number ;
 item_number : string ="";
 item_name  :string = "";
 description : string = "" ;
 item_qty : number ;
 unit_price: number;
 total_price : number;
 newQty : Quantity;
 items : any = [];
 projectname : string;
 Qty_tbls:any[]=[];
 Qty_tbl:any[]=[];
 editItem : any;
 formattedAmount: string = '';
  editItem1: any;

 constructor(public service : CoreService,  private router : Router, private formatPipe: NumberFormatPipe , 
  private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog,private currencyPipe:CurrencyPipe,
  @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectname = localStorage.getItem('projectname');
    //this.role = +localStorage.getItem('Role');
  }
   
  transformAmount(value){
    this.formattedAmount = this.currencyPipe.transform( value , " ");
    // Remove or comment this line if you dont want to show the formatted amount in the textbox.
    return this.formattedAmount;
}

//  onNoClick(): void {
//    this.dialogRef.close();
//  }

 
 ngOnInit() {
  this.service.getQty_tbl().subscribe(
    (res)=> {
      console.log(res);
      this.Qty_tbls = JSON.parse(JSON.stringify(res));
      this.Qty_tbl = res;
            
     //for number formatting 
      this.Qty_tbl.forEach(element => {
      element.item_qty = this.transformAmount(element.item_qty);
      element.price_unit = this.transformAmount(element.price_unit);
      element.price_total = this.transformAmount(element.price_total);
      element.excuted = this.transformAmount(element.excuted);
      element.total_excuted = this.transformAmount(element.total_excuted);
      
      });
      this.editItem=this.Qty_tbl.filter(q=>q.id==this.data);
      this.editItem1=this.editItem;
      this.description=this.editItem[0].description;
      this.bindData();
    },
      (err)=> console.log(err)
  );  
  
 }

 bindData(){
  alert(JSON.stringify(this.editItem1[0].description));
 }

 calTotal()
 {
   this.total_price = this.unit_price * this.item_qty;
 }

 Save()
 {
     this.newQty = {
           description : this.description , 
           first_subsection_id : +this.subid , 
           main_section_id : +this.mainid , 
           second_subsection_id : this.workid , 
           item_name : this.item_name ,
           item_number : this.item_number , 
           item_qty : this.item_qty , 
           price_total : this.total_price , 
           price_unit : this.unit_price , 
           product_uom : +this.unitid , 
           projectid : +localStorage.getItem('projectid')
     }
    //  this.coreService.createQty(this.newQty).subscribe(
    //    (data)=>{ 
    //      console.log(data) ;
       
    //      let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
    //                    if(msg)
    //                    {
    //                      location.reload();
    //                    }
     
    //    } ,
    //    err=> {console.log(err);}
    // );
 }

//the Stack bar Method 
openSnackBar(message: string, action: string) {
 this._snackBar.open(message, action, {
   duration: 2000,
   verticalPosition: 'top',
   horizontalPosition : 'center' ,
   panelClass: ['my-snack-bar']
 });

 return true;
 
}

}