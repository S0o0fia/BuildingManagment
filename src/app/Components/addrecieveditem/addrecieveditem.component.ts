import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RquestforRecieveItemsComponent } from '../rquestfor-recieve-items/rquestfor-recieve-items.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-addrecieveditem',
  templateUrl: './addrecieveditem.component.html',
  styleUrls: ['./addrecieveditem.component.scss']
})
export class AddrecieveditemComponent implements OnInit {


  minDate : Date;
  maxDate : Date;
  lng : number;
  lat:number;

  placeMarker(position: any) {
   this.lat = position.coords.lat;
   this.lng = position.coords.lng;
   }
  constructor(   public dialogRef: MatDialogRef<RquestforRecieveItemsComponent>,
    @Inject(MAT_DIALOG_DATA) private pageTitleService: PageTitleService,private translate : TranslateService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
      this.lng=46.6753;
      this.lat=24.7136;
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    this.pageTitleService.setTitle("طلبات فحص الأعمال");

    
  }  
}