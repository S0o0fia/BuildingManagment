import { Component, OnInit, Inject } from '@angular/core';
import { AttendeceComponent } from '../attendece/attendece.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-add-attendece',
  templateUrl: './add-attendece.component.html',
  styleUrls: ['./add-attendece.component.scss']
})
export class AddAttendeceComponent implements OnInit {

  minDate : Date;
  maxDate : Date;
  constructor(   public dialogRef: MatDialogRef<AttendeceComponent>,
    @Inject(MAT_DIALOG_DATA)  private pageTitleService: PageTitleService,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      dialogRef.disableClose = true;
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    this.pageTitleService.setTitle("الحضور والانصراف");

    
  }  

}
