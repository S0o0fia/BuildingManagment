import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-consultant-extract-detail',
  templateUrl: './consultant-extract-detail.component.html',
  styleUrls: ['./consultant-extract-detail.component.scss']
})
export class ConsultantExtractDetailComponent implements OnInit {

  Invoices:any[]=[];
  Discount : any[]=[];
  Items : any[] = [];

  totalRec : number;
  page: number = 1;
  public rowSelected : any = -1;
  id :number;
  constructor(private route:ActivatedRoute  , private router : Router , public service : CoreService) {
   
    this.id = +( this.route.snapshot.paramMap.get('id') );
   }

  ngOnInit() {
    this.service.getConsultantInvoice().subscribe(
      data=> {this.Invoices = data  as any[] ; 
        console.log(this.Invoices);
      }, 
      err => console.log(err)
    )
    
    this.service.getConsultantInvoiceitems(this.id).subscribe(
      data=>{
        this.Items = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );


    this.service.getConsultantInvoiceDiscount(this.id).subscribe(
      data=>{
        this.Discount = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );
  }



}
