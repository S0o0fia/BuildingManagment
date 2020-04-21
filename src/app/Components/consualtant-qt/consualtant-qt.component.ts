import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddconsualtantQTComponent } from '../addconsualtant-qt/addconsualtant-qt.component';

@Component({
  selector: 'ms-consualtant-qt',
  templateUrl: './consualtant-qt.component.html',
  styleUrls: ['./consualtant-qt.component.scss']
})
export class ConsualtantQTComponent implements OnInit {

  consultant_qty : any [] = [];
  Contract_id : number;
  constructor(public service : CoreService,  private router : Router, private route:ActivatedRoute ,
    private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog) { 

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.Contract_id = +( this.route.snapshot.paramMap.get('id') );
      localStorage.setItem('contract_id' , this.Contract_id.toString());


    }
    
  ngOnInit(): void {
   this.service.getConsultantqty().subscribe(
     data=> this.consultant_qty = data as any [] , 
     err=> console.log(err)
   )
  }

 openDialog(): void {
    const dialogRef = this.dialog.open(AddconsualtantQTComponent, {
      width: '80%',
      height: '80%'
     
    });

 
  }

}
