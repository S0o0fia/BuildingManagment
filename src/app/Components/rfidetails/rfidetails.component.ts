import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-rfidetails',
  templateUrl: './rfidetails.component.html',
  styleUrls: ['./rfidetails.component.scss']
})
export class RfidetailsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backtorfi()
  {
    this.router.navigate(['home/table/rfi']);
  }
}
