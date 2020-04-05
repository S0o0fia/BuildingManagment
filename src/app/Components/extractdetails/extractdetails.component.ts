import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-extractdetails',
  templateUrl: './extractdetails.component.html',
  styleUrls: ['./extractdetails.component.scss']
})
export class ExtractdetailsComponent implements OnInit {
  
  Invoices:any[]=[];
  Discount : any[]=[];
  Items : any[] = [];
  projectname : string;
  totalRec : number;
  page: number = 1;
  public rowSelected : any = -1;
  id :number;
  constructor(private route:ActivatedRoute  , private router : Router , public service : CoreService) {
    this.projectname = localStorage.getItem('projectname');
    this.id = +( this.route.snapshot.paramMap.get('id') );
   }

  ngOnInit() {
    this.service.getInvoice().subscribe(
      data=> {this.Invoices = data  as any[] ; 
        console.log(this.Invoices);
      }, 
      err => console.log(err)
    )
    
    this.service.getInvoiceitems(this.id).subscribe(
      data=>{
        this.Items = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );


    this.service.getInvoicediscount(this.id).subscribe(
      data=>{
        this.Discount = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );
  }



}
