import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog } from '@angular/material';
import { AddConsultantContractComponent } from '../add-consultant-contract/add-consultant-contract.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'ms-contractstable',
  templateUrl: './contractstable.component.html',
  styleUrls: ['./contractstable.component.scss']
})
export class ContractstableComponent implements OnInit {

  contract : any = [];
  formattedAmount: any;
  constructor(public service : CoreService,  private router : Router, private formatPipe: NumberFormatPipe , 
    private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog,private currencyPipe:CurrencyPipe)
    {
      
    }

  ngOnInit() {
    this.service.getConsultantContract().subscribe(
      data=> {
        console.log(data);
        this.contract = data;
              
       //for number formatting 
   this.contract.forEach(element => {
     element.contract_value = this.transformAmount(element.contract_value);
   
     
   });  
   
             }, 
      err => console.log(err)
    )
  }
  transformAmount(value){
    this.formattedAmount = this.currencyPipe.transform( value , " ");
    // Remove or comment this line if you dont want to show the formatted amount in the textbox.
    return this.formattedAmount;
}

  ConsultantQty(id)
  {
    this.router.navigate(['/home/ConsultantQty' , id]);
    localStorage.setItem('contract_id' , id);
  }

  TimeSheet(id)
  {
    this.router.navigate(['/home/timesheet' , id]); 
    localStorage.setItem('contract_id' , id);
  }
  Extract(id)
  {
    this.router.navigate(['/home/ExtractConsultant' , id]);
    localStorage.setItem('contract_id' , id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddConsultantContractComponent, {
      width: '80%',
      height: '80%'
     
    });

 
  }

}
