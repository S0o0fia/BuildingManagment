import { Component, OnInit, Inject } from '@angular/core';
import { CoreService } from 'app/service/core/core.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreatprojectComponent } from '../creatproject/creatproject.component';
import { LoginComponent } from '../login/login.component';
import { Quantity } from 'app/Models/Quantity/quantity';
import { CreatequantityComponent } from '../createquantity/createquantity.component';
import { ExcelService } from 'app/Service/excel.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as JSpfd from 'jspdf' 

@Component({
  selector: 'ms-quantitytable',
  templateUrl: './quantitytable.component.html',
  styleUrls: ['./quantitytable.component.scss']
})
export class QuantitytableComponent implements OnInit {
  collapseSidebarStatus: any;
  mySubscription : any;
  browserRefresh = false;
  totalRec : number;
  page: number = 1;
  constructor(public service : CoreService,  private router : Router,
      private pageTitleService: PageTitleService , private dialog: MatDialog) { 

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

     

      }
  
 Qty_tbl : any =[] ;
ngOnInit() {
this.pageTitleService.setTitle("جدول الكميات");
this.service.getQty_tbl().subscribe(
   (res)=> this.Qty_tbl = res ,
   (err)=> console.log(err)
);
   
 this.totalRec = this.Qty_tbl.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatequantityComponent, {
      width: '80%',
      height: '80%'
     
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate['/table/quantity'];
    
    });
  }

 
  exportAsXLSX():void {
   
   
  
  // this.excelService.generateExcel(this.Qty_tbl);
  }
  generatePdf(){
   
   // const documentDefinition = { content: this.Qty_tbl } 
   //pdfMake.createPdf(documentDefinition).download();;
    //pdfMake.createPdf(documentDefinition).print();
   }

}




