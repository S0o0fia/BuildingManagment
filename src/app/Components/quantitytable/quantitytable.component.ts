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
import { NumberFormatPipe } from 'app/Models/Pipe/number.pip';

@Component({
  selector: 'ms-quantitytable',
  templateUrl: './quantitytable.component.html',
  styleUrls: ['./quantitytable.component.scss'],

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
  item_type : number = 0;
  proj_item : number = 0;
  type_name : string;
  item_name : string;
  all : number = 0;
  disappearDisount : boolean = false; 
  total_excuted : number ;
  filterbyExceed : boolean = false;
  projectname : string;
  
  HideDiscount()
  {
     if(  this.disappearDisount == true)
     this.disappearDisount = false;
     else 
     this.disappearDisount = true;
  }

  FilterExceed(value)
  {
    if(value.checked){
      this.Qty_tbl=this.Qty_tbls.filter(x=>x.excuted > x.item_qty);
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }else{
      this.Qty_tbl=this.Qty_tbls;
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }
    

    // if(this.filterbyExceed == true)
    //  this.filterbyExceed = false;
    //  else 
    //  this.filterbyExceed = true;
  }

  bindProjectType(name)
  {
     this.item_name = name;
    

  }

  bindItemType(name,type)
  {
    // this.type_name = name;
    if(this.item_type ==0 && this.proj_item ==0){
      this.Qty_tbl=this.Qty_tbls;
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }
    if(this.item_type !=0 && this.proj_item !=0){
      this.Qty_tbl=this.Qty_tbls.filter(x=>x.first_subsection_id== this.proj_item && x.main_section_id== this.item_type);
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }
    if(this.proj_item !=0 && this.item_type ==0){
      this.Qty_tbl=this.Qty_tbls.filter(x=>x.first_subsection_id== this.proj_item);
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }
    if(this.item_type !=0 && this.proj_item ==0){
      this.Qty_tbl=this.Qty_tbls.filter(x=>x.main_section_id== this.item_type);
      this.Qty_tbl.forEach(element => {
        element.item_qty = this.formatPipe.transform(element.item_qty);
        element.price_unit = this.formatPipe.transform(element.price_unit);
        element.price_total = this.formatPipe.transform(element.price_total);
        element.excuted = this.formatPipe.transform(element.excuted);
        element.total_excuted = this.formatPipe.transform(element.total_excuted);   
      }); 
    }
    
    this.service.gettotals(this.proj_item , this.item_type).subscribe(
      data=> {
               this.total_budget = data[0].total as number;
               this.dis = data[0].discount as number;
               this.totaldis = this.total_budget - this.dis;
               this.total_budget_vat = ((this.total_budget)+(this.total_budget*0.05));

               this.total_budget = this.formatPipe.transform(this.total_budget);
               this.totaldis = this.formatPipe.transform(this.totaldis);
               this.total_budget_vat = this.formatPipe.transform(this.total_budget_vat);
     }, 
      err=>console.log(err)
    )

     
  }

  constructor(public service : CoreService,  private router : Router, private formatPipe: NumberFormatPipe , 
      private pageTitleService: PageTitleService , private dialog: MatDialog , private discount : MatDialog) { 

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.projectname = localStorage.getItem('projectname');

     

      }
  
 Qty_tbl : any =[] ;
 Qty_tbls:any[]=[];
ngOnInit() {



this.pageTitleService.setTitle(this.projectname +' / '+"جدول الكميات");

this.service.gettotal().subscribe(
  data=>{
    console.log(data);
    this.total_budget = data[0].total as number;
    this.dis = data[0].discount as number;
    this.totaldis = this.total_budget - this.dis;
    this.total_budget_vat = ((this.total_budget)+(this.total_budget*0.05));
    this.total_excuted =   data[0].total_excuted as number

    this.total_budget = this.formatPipe.transform(this.total_budget);
    this.totaldis = this.formatPipe.transform(this.totaldis);
    this.total_budget_vat = this.formatPipe.transform(this.total_budget_vat);
    this.total_excuted = this.formatPipe.transform(this.total_excuted);
    
  }, 
  err => console.log(err)
);

this.service.getQty_tbl().subscribe(
   (res)=> {
     this.Qty_tbls = JSON.parse(JSON.stringify(res));
     this.Qty_tbl = res;
           
    //for number formatting 
this.Qty_tbl.forEach(element => {
  element.item_qty = this.formatPipe.transform(element.item_qty);
  element.price_unit = this.formatPipe.transform(element.price_unit);
  element.price_total = this.formatPipe.transform(element.price_total);
  element.excuted = this.formatPipe.transform(element.excuted);
  element.total_excuted = this.formatPipe.transform(element.total_excuted);

  
});  

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




