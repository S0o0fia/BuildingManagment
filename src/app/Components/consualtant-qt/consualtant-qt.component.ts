import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddconsualtantQTComponent } from '../addconsualtant-qt/addconsualtant-qt.component';
import { trigger, transition, style, animate, query, state } from '@angular/animations';

@Component({
  
  selector: 'ms-consualtant-qt',
  templateUrl: './consualtant-qt.component.html',
  styleUrls: ['./consualtant-qt.component.scss'] ,
  animations:[
   
    trigger('tabletoggle' , [
      transition(':enter', [
        style({ opacity: 0 }), animate('1000ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('1000ms', style({ opacity: 0 }))]
      )
    ]) 
    
  ] 
 
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

    back()
  {
    this.router.navigate(['/home/ConsultantContracts']);
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
