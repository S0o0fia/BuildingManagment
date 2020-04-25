import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog } from '@angular/material';
import { AddConsultantExtractComponent } from '../add-consultant-extract/add-consultant-extract.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-consultant-extract',
  templateUrl: './consultant-extract.component.html',
  styleUrls: ['./consultant-extract.component.scss']
})
export class ConsultantExtractComponent implements OnInit {

  totalRec : number; 
  page : number = 0;
  //
  invoices : any[]=[];
  contract_id : number;
  constructor(public service : CoreService , public router : Router) { 

   this.contract_id = +(localStorage.getItem('contract_id'));
  }

  ngOnInit() {
    this.service.getConsultantInvoices().subscribe(
       data=> {
         data.forEach(element => {
           if(element.contract_id == this.contract_id)
           {
             this.invoices.push(element);
           }
          
         });
         console.log(this.invoices);
      } , 
       err => console.log(err) 
    )
    this.totalRec = this.invoices.length;
  }

  open()
  {
       this.router.navigate(['/home/AddExtractConsultant']);
   
  }

  invoicedetails(id)
  {
    this.router.navigate(['/home/ExtractConsultantDetails' , id]);
  }
}
