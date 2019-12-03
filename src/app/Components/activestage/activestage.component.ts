import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {pieChartDemoData} from 'app/Models/chart-data'
import { stackedAreaChartData } from "app/Models/stackedAreaChart.data";

@Component({
  selector: 'ms-activestage',
  templateUrl: './activestage.component.html',
  styleUrls: ['./activestage.component.scss']
})
export class ActivestageComponent implements OnInit {

  constructor(       private pageTitleService: PageTitleService) { }

  pieChartDemoData :any[];
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
    
    this.stackedAreaChartOptions = {
      name: 'Sample Full Width Graph',
    };

     this.pageTitleService.setTitle("المنصة التفاعلية");
     this.pieChartDemoData =[
      {
        "label" : "المتوقع",
        "value" : 60
      },
      {
        "label" : "الفعلي",
        "value" : 30
      },
      {
        "label" : "الفرق",
        "value" : 16
      }
    ];// pieChartDemoData;
    

}}


