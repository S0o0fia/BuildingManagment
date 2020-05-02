import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {pieChartDemoData} from 'app/Models/chart-data'
import { stackedAreaChartData } from "app/Models/stackedAreaChart.data";
import * as pbi from 'powerbi-client';  
import { CoreService } from 'app/Service/core/core.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
@Component({
  selector: 'ms-activestage',
  templateUrl: './activestage.component.html',
  styleUrls: ['./activestage.component.scss']
})
export class ActivestageComponent implements OnInit {
  
  data : any [] = [];
  //rfi 
  accepted : number = 0; 
  aceeptedwithcomment : number = 0; 
  waiting : number = 0; 
  draft : number = 0;
  rejected : number = 0;
  //Count
  dataCount : any[]=[] ;
  acceptedc : number = 0;
  aceeptedwithcommentc : number =0 ;
  waitingc : number = 0;
  draftc : number =0;
  rejectedc : number = 0;
  //for pie ؤCOUNT
  public pieChartData1  :SingleDataSet;
  public pieChartType1:string
  pieChartColors1: any[] ;
  PieChartOptions1: any;
  public pieChartOptions: ChartOptions = {
   responsive: true,
 };
 public pieChartLabels1: Label[] = [['Accepted', 'مقبول'], ['Draft', 'مسودة'], ['Waiting', 'بانتظار الاعتماد'] , ['Rejected', 'مرفوض'] ];
 public pieChartType: ChartType = 'pie';
 public pieChartLegend = true;
 public pieChartPlugins = [];
 //FOR PIE RFI
 public pieChartData2  :SingleDataSet;
 public pieChartType2:string
 pieChartColors2: any[] ;

public pieChartLabels2: Label[] = [['Accepted', 'مقبول'], ['Accepted with', 'comments', 'مقبول بملاحظات'], ['Draft', 'مسودة'], ['Waiting', 'بانتظار الاعتماد'] , ['Rejected', 'مرفوض'] ];

  constructor(private pageTitleService: PageTitleService , public service : CoreService) { 
   monkeyPatchChartJsTooltip();
   monkeyPatchChartJsLegend();

  }

   // Pie
  
  
  pieChartDemoData :any[];
  pieChartDemoDataC : any[];
  stackedAreaChartOptions;
  public simpleBarChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  public simpleBarChartLegend:boolean = true;
  public simpleBarChartData:any[] = [
     {data: [65, 59, 80, 81, 56, 55, 40], label: 'Purchase'},
     {data: [28, 48, 40, 19, 86, 27, 90], label: 'Plans'},
     {data: [18, 38, 20, 9, 66, 37, 70], label: 'Services'}
  ];
  public simpleBarStackChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true,
     scales: {
        xAxes: [{
           stacked: true,
        }],
        yAxes: [{
           stacked: true,
        }]
     }
  };
   // lineChart
   public lineChartData:Array<any> = [
    {data: [90, 150, 80, 300, 90, 290, 350,200,80,100,220,230,310,230,150,180,120,150], label: 'Series A'},
    {data: [110, 90, 150, 130, 290, 210, 200,80,80,110,320,310,50,170,210,310,150,80,450], label: 'Series B'},
 ];
 public lineChartLabels:Array<any> = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18'];
 public lineChartOptions:any = {
    responsive: true,
    scales: {
       xAxes: [{
          ticks: {
             beginAtZero: true,
             suggestedMax: 450
          }
       }]
    }
 };
 lineChartColors: Array <any> = [{
    backgroundColor: 'rgba(235, 78, 54, 0.2)',
    borderColor: 'rgba(235, 78, 54, 1)',
    pointBackgroundColor: 'rgba(235, 78, 54, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(235, 78, 54, 0.8)'
 }, {
    backgroundColor: 'rgba(0, 151, 167, 0.2)',
    borderColor: 'rgba(0, 151, 167, 1)',
    pointBackgroundColor: 'rgba(0, 151, 167, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0, 151, 167, 0.8)'
 }];
public lineChartLegend:boolean = false;
public lineChartType:string = 'line';

  ngOnInit() {

   this.service.getRFIChart().subscribe(
      data=> {
         this.data = data[0] as any[]
          this.accepted = this.data['aceepted'];
          this.aceeptedwithcomment  = this.data['accepted2'];
          this.rejected = this.data['rejected'];
          this.waiting = this.data['waiting'];
          this.draft = this.data['draft'];
          this.pieChartData2 = 
           [   
              this.accepted , this.aceeptedwithcomment , this.draft , this.waiting , this.rejected
           ];
           this.pieChartType2 = 'pie';
          this.pieChartColors2 = [{
         backgroundColor: ['#10988c', '#8bbb47' ,'#1565c0', '#f9fc2f', '#ff4747']
     
  
        }];
   this.PieChartOptions1 = {
      elements: {
         arc: {
            borderWidth: 0
         }
      }
   }

          
      
      } , 
      err=> console.log (err)
   )

   //Count
   this.service.getCountChart().subscribe(
      data=> {
          this.dataCount = data[0] as any[]
          this.acceptedc = this.dataCount['aceepted'];
          this.rejectedc = this.dataCount['rejected'];
          this.waitingc = this.dataCount['waiting'];
          this.draftc = this.dataCount['draft'];
          this.pieChartData1 = 
           [   
              this.acceptedc , this.draftc , this.waitingc , this.rejectedc
           ];
           this.pieChartType1 = 'pie';
          this.pieChartColors1 = [{
         backgroundColor: ['#10988c', '#1565c0', '#f9fc2f', '#ff4747']
     
  
   }];
   this.PieChartOptions1 = {
      elements: {
         arc: {
            borderWidth: 0
         }
      }
   }

   
      } , 
      err=> console.log (err)
   )
    
    this.stackedAreaChartOptions = {
      name: 'Sample Full Width Graph',
    };

     this.pageTitleService.setTitle("المنصة التفاعلية");
     


}



}


