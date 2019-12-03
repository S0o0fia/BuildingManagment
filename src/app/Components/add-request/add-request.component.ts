import { Component, OnInit, Inject } from '@angular/core';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rfi } from 'app/Models/RFI/rfi';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  
  minDate : Date;
  maxDate : Date;
  constructor(   public dialogRef: MatDialogRef<RequestForInspectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rfi, private pageTitleService: PageTitleService,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    this.pageTitleService.setTitle("طلبات فحص الأعمال");

    
  }  
}
