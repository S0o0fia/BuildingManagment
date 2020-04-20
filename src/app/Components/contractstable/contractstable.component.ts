import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { Router } from '@angular/router';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog } from '@angular/material';
import { AddConsultantContractComponent } from '../add-consultant-contract/add-consultant-contract.component';

@Component({
  selector: 'ms-contractstable',
  templateUrl: './contractstable.component.html',
  styleUrls: ['./contractstable.component.scss']
})
export class ContractstableComponent implements OnInit {

  contract : any[] = [];
  constructor(public service : CoreService,  private router : Router, private formatPipe: NumberFormatPipe , 
    private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog)
    {
      
    }

  ngOnInit() {
    this.service.getConsultantContract().subscribe(
      data=> this.contract = data as any[] , 
      err => console.log(err)
    )
  }


  ConsultantQty(id)
  {
    this.router.navigate(['/home/ConsultantQty' , id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddConsultantContractComponent, {
      width: '80%',
      height: '80%'
     
    });

 
  }

}
