import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { QuantitytableComponent } from '../quantitytable/quantitytable.component';
import { Quantity } from 'app/Models/Quantity/quantity';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { CoreService } from 'app/Service/core/core.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'ms-createquantity',
  templateUrl: './createquantity.component.html',
  styleUrls: ['./createquantity.component.scss']
})

export class CreatequantityComponent implements OnInit {

   subscription : Subscription;
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
 
  constructor(   public dialogRef: MatDialogRef<QuantitytableComponent>, private router : Router
    ,private _snackBar: MatSnackBar , @Inject(MAT_DIALOG_DATA) public data: Quantity,private fb: FormBuilder, private pageTitleService: PageTitleService
    ,private translate : TranslateService , private coreService:CoreService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      this.projectname = localStorage.getItem('projectname');
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    
    this.coreService.getMainSectionList().subscribe(
      data=>this.Mainsection = data, 
      err=> console.log(err)
    );

    this.coreService.getUnit().subscribe(
      data=>this.Unit = data, 
      err=> console.log(err)
    );
    
    this.coreService.getProjectitem().subscribe(
      data=> this.items = data , 
      err=> console.log(err)
    );


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
      this.coreService.createQty(this.newQty).subscribe(
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
