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
import { DiscountComponent } from '../discount/discount.component';

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
  total_budget : number ;
  total_budget_vat :number;
  dis : number ; 
  totaldis : number;
  projectitem : string ;
  section : any = [];
  projectitems : any =[];
  item_type : number;
  proj_item : number;
  type_name : string;
  item_name : string;

  
  
  bindProjectType(name)
  {
     this.item_name = name;
    

  }

  bindItemType(name)
  {
    this.type_name = name;



    
    this.service.gettotals(this.proj_item , this.item_type).subscribe(
      data=> {
               this.total_budget = data[0].total as number;
               this.dis = data[0].discount as number;
               this.totaldis = this.total_budget - this.dis;
               this.total_budget_vat = ((this.total_budget)+(this.total_budget*0.05));
     }, 
      err=>console.log(err)
    )
  }

  constructor(public service : CoreService,  private router : Router,
      private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog) { 

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

     

      }
  
 Qty_tbl : any =[] ;
ngOnInit() {
this.pageTitleService.setTitle("جدول الكميات");
this.service.getQty_tbl().subscribe(
   (res)=> {this.Qty_tbl = res 
            console.log(this.Qty_tbl);
          },
   (err)=> console.log(err)
);


 this.service.getMainSectionList().subscribe(
   data=> this.section = data , 
   err => console.log(err)
 )
   
 this.service.getProjectitem().subscribe(
   data=> this.projectitems = data , 
   err=> console.log(err)
 )

 
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

  opendiscount()
  { 
  
    const discountrf = this.discount.open(DiscountComponent , {
      width: '40%',
      height: '70%'
    }) ;  

    discountrf.afterClosed().subscribe(result => {
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




