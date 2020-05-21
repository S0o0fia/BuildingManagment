import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { CoreService } from 'app/service/core/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectModel } from 'app/Models/Project/project-model';
import { PageTitleService } from '../core/page-title/page-title.service';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { ChooserequestComponent } from '../chooserequest/chooserequest.component';

@Component({
  selector: 'ms-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})


export class CrmComponent implements OnInit, OnDestroy {
   company_id : number=Number(localStorage.getItem("company_id"));

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
      coinList               : any;
      tickerSliderContent    : any;
      statsCardData          : any;
      safeTradeContent       : any;
      exchangeStatistic      : any;
      tradeHistory           : any;
      ProjectList : any[];
      resultsLength = 0;
      collapseSidebarStatus  : boolean;
      currentRoute           : any;
      totalRec : number;
      page: number = 1;
     
      @ViewChild(MatSort,{static: false}) sort : MatSort;
     
   
      //ticker slider config 
      tickerSliderConfig  = {
         "speed": 10000,
         "autoplay": true,
         "autoplaySpeed": 0,
         "cssEase": 'linear',
         "slidesToShow": 5, 
         "slidesToScroll": 1,
         "arrows": false,
         "dots": false,
         "responsive": [
            {
               "breakpoint": 1480,
               "settings": {
                  "slidesToShow": 4,
                  "slidesToScroll": 1
               }
            },
            {
               "breakpoint": 1280,
               "settings": {
                  "slidesToShow": 3,
                  "slidesToScroll": 1
               }
            },
            {
               "breakpoint": 960,
               "settings": {
                  "slidesToShow": 2,
                  "slidesToScroll": 1,
                  "speed": 7000
               }
            },
            {
               "breakpoint": 599,
               "settings": {
                  "slidesToShow": 1,
                  "slidesToScroll": 1
               }
            }
         ]
      }
   
      //safe trade
     
      cryptoCompareColumns = ["id","name","consultant_name","contractor_name" , "Status" , "Controls"];
      dropList = [
         "Edit Project",
         "Project Items" ,
         "Quantity Table",
         "Request for Inspection",         
         "Request for Recieves Items",
         "List of Count" ,       
         "Files Managment",
         "Project Obstacles",
         "Abstracts" ,
         "ٌRequests",
         "Project Schedule"
               ];
      
      /*
         ----------Choose from drop down list  ----------
      */
      Choose(list , id , name)
      {
        
         localStorage.setItem('projectid' , id);
         localStorage.setItem('projectname' , name);
         switch(list)
         {
            case "Edit Project":
               {this.router.navigate(['/home/edit']); }
                  break;

            case "Quantity Table" :
            {this.router.navigate(['/home/table/quantity']);}
             break;
            
          case "Project Schedule": 
          {this.router.navigate(['/home/projectschedule']);}
           break;    

           case "Request for Inspection":  
           {this.router.navigate(['/home/table/rfi']);}
           break;
           
                  
           case "Request for Recieves Items": 
           {this.router.navigate(['/home/table/receiveitem']);}
           break;
         

           case "List of Count" :{
                     this.router.navigate(['/home/table/countdetails']);
                  } break;

            case "Project Items":
                     {this.router.navigate(['/home/itemslist']); }
                        break;      

              case"Files Managment": 
               {this.router.navigate(['/home/filemanagement']);}
               break;
        
                    

            case "Abstracts" :  
              {this.router.navigate(['/home/abstracts']);}
            break;
      
            case "Requests" :
            {
           
             this.openDialog();
            }   
            break;
         }
      }

      openDialog(): void {
         const dialogRef = this.dialog.open(ChooserequestComponent, {
           width: '50%',
           height: '80%'
          
         });
      }

      deleteProject(id)
      {
       this. _snackBar.open("تم الحذف بنجاح " , "إغلاق" , {
         duration: 2000,
         verticalPosition: 'top',
         horizontalPosition : 'center' ,
         panelClass: ['my-snack-bar']
       })
       this.service.deleteproject(id).subscribe(
         data=>console.log(data),
         err=>console.log(err)
      );
      location.reload();
    }


      activestage(id){
         this.router.navigate(['/home/activestage']);
         localStorage.setItem('projectid',id);
      }
      // live status chart label
      public liveStatusChartLabel :string[] = ['9', '10', '11', '12'];
      
      //live status chart data
      public liveStatusChartData : any[] = [
         {data: [100, 200, 125, 250],label:"Live status"}
      ];
   
      //live status chart color
      public liveStatusChartColors: Array <any> = [
         {
            fill: false,
            lineTension: 0,
            fillOpacity: 0.3,
            pointHoverBorderWidth: 4,
            borderWidth:4,
            pointHoverRadius: 7,
            pointBorderWidth: 3,
            pointRadius: 6,
            backgroundColor: '#1565c0',
            borderColor: '#1565c0',
            pointBackgroundColor: '#1565c0',
            pointBorderColor:'#FFFFFF',
            pointHoverBackgroundColor: '#1565c0',
            pointHoverBorderColor: '#1565c0'
         }
      ];

      Count(id)
      {
         localStorage.setItem('projectid' , id);
         this.router.navigate(['/home/table/countdetails']);

      }
   
      constructor(public service : CoreService,
                  private router : Router,
                  private pageTitleService: PageTitleService ,
                  private route: ActivatedRoute ,
                  public _snackBar : MatSnackBar,
                  private dialog: MatDialog) { 

                     
                     const dialogConfig = new MatDialogConfig();

                     dialogConfig.disableClose = true;
                     dialogConfig.autoFocus = true;
             
                  
                     }
            
      ngOnInit() {
        
   
         this.pageTitleService.setTitle("الرئيسية");
      
         this.service.getTickerData().
            subscribe( res => {this.tickerSliderContent = res},
                       err => console.log(err),
                       ()  =>  this.tickerSliderContent
            );
   
         this.service.getCryptoStatsCardContent().
            subscribe( res => {this.statsCardData = res},
                       err => console.log(err),
                       ()  =>  this.statsCardData
            );
   
         this.service.getProjectList().
            subscribe( res =>
                     { 
                        debugger
                        
                        console.log(res);
                        let list=res as any[];
                      this.ProjectList = list.filter(p=>p.contractor_id==this.company_id || p.consultant_id==this.company_id);
                      this.totalRec = this.ProjectList.length;
                      },                     
                       err => console.log(err),
                       ()  => this.ProjectList
       );
      }
   
      //showTradeHistory method is used to open the dailog of trade history.
    
      //cryptoSelect method is used to show the table data according to selected coin.
   
   
      ngOnDestroy(){
         if(this.currentRoute != 'horizontal' && this.collapseSidebarStatus== false){
            if(document.getElementById('main-app').classList.contains('collapsed-sidebar')){
               this.service.collapseSidebar = false;
            }
         }
      }
   }
