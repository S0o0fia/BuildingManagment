import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { AddExtractComponent } from '../add-extract/add-extract.component';

@Component({
  selector: 'ms-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {


  minDate : Date;
  maxDate : Date;
  constructor(   public dialogRef: MatDialogRef<AddExtractComponent>,
    @Inject(MAT_DIALOG_DATA)  private pageTitleService: PageTitleService,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    

    
  }  
}