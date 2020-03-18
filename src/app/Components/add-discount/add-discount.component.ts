import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddExtractComponent } from '../add-extract/add-extract.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  minDate : Date;
  maxDate : Date;
  projectname : string;
  constructor(   public dialogRef: MatDialogRef<AddExtractComponent>,
    @Inject(MAT_DIALOG_DATA) private pageTitleService: PageTitleService,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      this.projectname = localStorage.getItem('projectname');
      dialogRef.disableClose = true;
    }
  	
  
 
  
  ngOnInit() {
    

    
  }  
}