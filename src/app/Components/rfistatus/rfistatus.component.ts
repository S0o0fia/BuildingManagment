import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-rfistatus',
  templateUrl: './rfistatus.component.html',
  styleUrls: ['./rfistatus.component.scss']
})
export class RFIStatusComponent implements OnInit {

  RFI : any;
  constructor(private services : CoreService) { }

  ngOnInit() {
    this.services.getRFI_tbl().subscribe(
      data=> this.RFI = data,
      err=> console.log(err)
    );
  }

}
