import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { QuantitytableComponent } from '../quantitytable/quantitytable.component';
import { Quantity } from 'app/Models/Quantity/quantity';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-createquantity',
  templateUrl: './createquantity.component.html',
  styleUrls: ['./createquantity.component.scss']
})
export class CreatequantityComponent implements OnInit {

  minDate : Date;
  maxDate : Date;
  Mainsection : any;
  mainid : any = null;
  workid : any = null;
  subid : any = null;

  constructor(   public dialogRef: MatDialogRef<QuantitytableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Quantity,private fb: FormBuilder, private pageTitleService: PageTitleService
    ,private translate : TranslateService , private coreService:CoreService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    
    this.coreService.getMainSectionList().subscribe(
      data=>{this.Mainsection = data; console.log(this.Mainsection)} , 
      err=> console.log(err)
    );

  }
}
