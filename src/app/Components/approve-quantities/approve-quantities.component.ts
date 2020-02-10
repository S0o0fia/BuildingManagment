import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ms-approve-quantities',
  templateUrl: './approve-quantities.component.html',
  styleUrls: ['./approve-quantities.component.scss']
})
export class ApproveQuantitiesComponent implements OnInit {

  project : any[]=[];
  projectid : number;
  from : Date = new Date();
  to: Date = new Date;
  minDate : Date;
  maxDate : Date;
  approveaty : any[]=[];
  constructor( private services : CoreService) {
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
  }

  ngOnInit() {
    this.services.getProjectList().subscribe(
      data => this.project = data as [] ,
      err=> console.log(err)
    );



  }

  Filter()
  {
    console.log(this.projectid);

    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startDate = formatDate(this.from, format, locale);
    let EndDate = formatDate(this.to, format, locale);

    this.services.getApprovedQty(this.projectid , startDate , EndDate).subscribe(
      data =>this.approveaty = data as any,
      err=> console.log(err)
    );
   
  
  }
    
}
