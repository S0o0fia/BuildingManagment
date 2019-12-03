import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CoreService } from 'app/service/core/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectModel } from 'app/Models/Project/project-model';
import { PageTitleService } from '../core/page-title/page-title.service';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'ms-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})


export class CrmComponent implements OnInit, OnDestroy {
    
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
         "Quantity Table",
         "Files Managment",
         "Lines Files Managment",
         "Request for Inspection",
         "Request for Recieves Items",
         "Project Obstacles",
         "Monthly Report",
         "Financial Flow" ,
         "Current Extracts",
         "Abstracts" ,
         "History Formats",
         "Show Location Map"      ];
      
      /*
         ----------Choose from drop down list  ----------
      */
      Choose(list , id)
      {
        
         localStorage.setItem('prijectId' , id);
         switch(list)
         {
            case "Edit Project":
               {this.router.navigate(['/home/edit']); }
                  break;

            case "Quantity Table" :
                  {this.router.navigate(['/home/table/quantity']);}
                  break;
                 
            case"Files Managment": 
               {this.router.navigate(['/home/filemanagement']);}
               break;
              case  "Lines Files Managment":  break;
            
           case "Request for Inspection":  
                     {this.router.navigate(['/home/table/rfi']);}
                break;
                  
            case "Request for Recieves Items": 
                    {this.router.navigate(['/home/receiveitem']);}
               break;
                   
            case "Project Obstacles":  break;
                       case "Monthly Report":  break;
                          case  "Financial Flow" :  break;
                             case "Current Extracts":  break;

            case "Abstracts" :  
              {this.router.navigate(['/home/abstracts']);}
            break;
            
            case "History Formats":  break;

            case "Show Location Map": break;
         }
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

      RFI(id)
      {
         localStorage.setItem('prijectId' , id);
         {this.router.navigate(['/home/table/rfi']);}

      }
   
      constructor(public service : CoreService,
                  private router : Router,
                  private pageTitleService: PageTitleService ,
                  private route: ActivatedRoute) { 

                     
                
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
                     { console.log(res);
                      this.ProjectList = res as any[];
                      this.totalRec = this.ProjectList.length;
                      console.log(this.totalRec);
                      console.log(this.page);
                     
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
