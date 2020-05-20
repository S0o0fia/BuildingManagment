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
 newQty : any;
 items : any = [];
 projectname : string;
 Qty_tbls:any[]=[];
 Qty_tbl:any[]=[];
 editItem : any;
 formattedAmount: string = '';
 item_type: any;
 item_types:any[]=[{id:1,value:"Contracted"},{id:2,value:"Calibration"}];

 constructor(public dialogRef: MatDialogRef<QuantitytableComponent>, public service : CoreService,  private router : Router, private formatPipe: NumberFormatPipe , 
  private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog,private currencyPipe:CurrencyPipe,
  @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.projectname = localStorage.getItem('projectname');
    //this.role = +localStorage.getItem('Role');
    dialogRef.disableClose = true;
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
  this.service.getMainSectionList().subscribe(
    data=>{this.Mainsection = data ; 
      console.log(this.Mainsection);
    }, 
    err=> console.log(err)
  );

  this.service.getUnit().subscribe(
    data=>this.Unit = data, 
    err=> console.log(err)
  );
  
  this.service.getProjectitem().subscribe(
    data=> this.items = data , 
    err=> console.log(err)
  );

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
      this.description=this.editItem[0].description;
      this.unitid=this.editItem[0].product_uom;
      this.item_type=this.editItem[0].item_type;
      this.item_number=this.editItem[0].item_number;
      this.item_name=this.editItem[0].item_name;
      this.unit_price=Number(this.editItem[0].price_unit);
      this.mainid=this.editItem[0].main_section_id;
      this.item_qty=Number(this.editItem[0].item_qty);
    },
      (err)=> console.log(err)
  );  
  
 }

 calTotal()
 {
   this.total_price = this.unit_price * this.item_qty;
 }

 Save()
 {
  this.newQty = {
    id : this.editItem[0].id,
    description : this.description,
    main_section_id : +this.mainid, 
    item_name : this.item_name ,
    item_number : this.item_number , 
    item_qty : this.item_qty , 
    price_unit : this.unit_price , 
    product_uom : +this.unitid , 
    item_type : this.item_type
  }
     this.service.updateQty(this.newQty).subscribe(
       (data)=>{ 
         console.log(data) ;
       
         let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
                       if(msg)
                       {
                         location.reload();
                       }
     
       } ,
       err=> {console.log(err);}
    );
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