import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  value : number = 0;
  percentage : number =0;
  mechanism : number;
  totalvalue : number;
  total : number ; 
  totalVat : number  = 0;
  constructor(public service : CoreService ,) { }

  ngOnInit() {
    this.service.gettotal().subscribe(
      data=> {
        this.total = data[0].total as number;
        this.totalVat = ((this.total)+(this.total*0.05))
        ;
      }, 
       err=>console.log(err)

    );
  }

  Cal(val)
  {
    if(val==1)
    {
        this.percentage = Math.round((this.value/this.total)*100);
    }
    else
    {
      this.value = ((this.percentage/100)*this.total);
    }
  }

  CalTotal(val)
  {
    if(val == 1)
    {

       this.totalvalue = this.total - this.value;

    }

    else 
    {
      this.totalvalue = this.totalVat - this.value;
    
    }
  }

  Apply()
  {
    this.service.Applydiscount(this.value).subscribe(
      data=>console.log(data) , 
      err=> console.log(err)
    );
  }
}
