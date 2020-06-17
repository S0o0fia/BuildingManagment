import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { PageTitleService } from '../core/page-title/page-title.service';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit {

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


//Bar Chart 
public barChartOptions:any = {
   scaleShowVerticalLines: false,
   responsive: true
 };
   //lables
   public mbarChartLabels1 :string[] =[];
   public mbarChartLabels2 :string[] =[];
   public mbarChartLabels3 :string[] =[];
   public mbarChartLabels4 :string[] =[];
   //Data
   
   public barChartData:any[] = [];
   public barChartData1:any[]=[];
   public barChartData2:any[]=[];
   public barChartData3:any[]=[{data:[120] , label:"نسبة الإنجاز الفعلية"}];
   public barChartData4:any[]=[{data:[50 ,120] , label:"Actual Achievement"}];
//options  for type
   public barChartType:string = 'bar';
   public barHorizontalChartType:string = 'horizontalBar';
   public barHorizontalChartLegend:boolean = true;

   public barHorizontalChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
   };
   
   public barChartLegend:boolean = true;

   //For More Data
   public percentage : number[]=[];
   public planned_pers : number []=[];
   public total_excuted : number []=[]; 
   public SPI : any[]=[]; 
   public financePrecentage : any[] =[];
   public techPrecentage: any[]=[];
   public acualpercentage : any[]=[];
   public acualplanned_pers : any[]=[];
    
  public percent3: number;
 
  public options3: any;

  
 
   //Color
   public barChartColors:Array<any> = [
      {
        backgroundColor: '#0070D1',
        borderColor: '#0070D1',
        pointBackgroundColor: 'rgba(105,159,177,1)',
        pointBorderColor: '#fafafa',
        pointHoverBackgroundColor: '#fafafa',
        pointHoverBorderColor: '#0070D1'
      },
      { 
         backgroundColor: '#ff3db4',
         borderColor: '#ff3db4',
         pointBackgroundColor: 'rgba(77,20,96,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: '#ff3db4'
       } ,
       { 
         backgroundColor: '#02bc77',
         borderColor: '#02bc77',
         pointBackgroundColor: 'rgba(77,20,96,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: '#02bc77'
       } ,

       { 
         backgroundColor: '#f59c1a',
         borderColor: '#f59c1a',
         pointBackgroundColor: 'rgba(77,20,96,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: '#f59c1a'
       } ,
    ];
   
      
   // events
   public chartClicked(e:any):void {
     console.log(e);
   }
 
   public chartHovered(e:any):void {
     console.log(e);
   }
 
   public randomize():void {
     let data = [
       Math.round(Math.random() * 100),
       Math.round(Math.random() * 100),
       Math.round(Math.random() * 100),
       (Math.random() * 100),
       Math.round(Math.random() * 100),
       (Math.random() * 100),
       Math.round(Math.random() * 100)];
     let clone = JSON.parse(JSON.stringify(this.barChartData));
     clone[0].data = data;
     this.barChartData = clone;
   }

  constructor(private pageTitleService: PageTitleService , public service : CoreService) { 
   monkeyPatchChartJsTooltip();
   monkeyPatchChartJsLegend();

   this.percent3 = 75;
   this.options3 = {
        barColor: '#02bc77',
        trackColor: '#f9f9f9',
        scaleColor: '#dfe0e0',
        scaleLength: 5,
        lineCap: 'round',
        lineWidth: 10,
        size: 300,
        rotate: 0,
        animate: {
            duration: 3000,
            enabled: true
        }
   };

  }

   // Pie
  newpieChartOptions : any;
  newpieChartOptions2 : any;
  option : any;
  
    ngOnInit() {
   
      
   this.service.getRFIChart().subscribe(
      data=> {
         this.data = data[0] as any[]
          this.accepted = this.data['aceepted'];
          this.aceeptedwithcomment  = this.data['accepted2'];
          this.rejected = this.data['rejected'];
          this.waiting = this.data['waiting'];
          this.draft = this.data['draft'];
          this.newpieChartOptions = {
            tooltip : {
               trigger: 'item',
               formatter: "{b} : {c} ({d}%)"
            },
            legend: {
               bottom: 10,
                 left: 'center',
                 x : 'center',
                 y : 'bottom'
             },
            series : [
               {
                  type: 'pie',
                  radius : '75%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  itemStyle : {
                     normal : {
                        label : {
                           show : false
                        },
                        labelLine : {
                           show : false
                        }
                     }
                  },
                  data:[
                     {
                        label: {
                           normal: {
                              backgroundColor: '#eee',
                              borderColor: '',
                              borderWidth: 1,
                              borderRadius: 4
                           }
                        }
                     },
                     {value:this.accepted, name: 'مقبول', itemStyle: {color: '#00acac'}},
                     {value:this.aceeptedwithcomment, name: 'مقبول بملاحظات', itemStyle: {color: '#9ACD32'}},
                     {value:this.waiting, name: 'بانتظار الاعتماد', itemStyle: {color: '#f59c1a'}},
                     {value:this.rejected, name: 'مرفوض', itemStyle: {color: '#C00000'}},
                     {value:this.draft , name: 'مسودة', itemStyle: {color: '#3498db'}}
                  ]
               }
            ]
         };
      

          
      
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
          this.newpieChartOptions2 = {
            tooltip : {
               trigger: 'item',
               formatter: "{b} : {c} ({d}%)"
            },
            legend: {
               bottom: 10,
                 left: 'center',
                 x : 'center',
                 y : 'bottom'
             },
            series : [
               {
                  type: 'pie',
                  radius : '75%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  itemStyle : {
                     normal : {
                        label : {
                           show : false
                        },
                        labelLine : {
                           show : false
                        }
                     }
                  },
                  data:[
                     {
                        label: {
                           normal: {
                              backgroundColor: '#eee',
                              borderColor: '',
                              borderWidth: 1,
                              borderRadius: 4
                           }
                        }
                     },
                     {value:this.acceptedc, name: 'مقبول', itemStyle: {color: '#00acac'}},
                     {value:this.aceeptedwithcommentc, name: 'مقبول بملاحظات', itemStyle: {color: '#9ACD32'}},
                     {value:this.waitingc, name: 'بانتظار الاعتماد', itemStyle: {color: '#f59c1a'}},
                     {value:this.rejectedc, name: 'مرفوض', itemStyle: {color: '#C00000'}},
                     {value:this.draftc , name: 'مسودة', itemStyle: {color: '#3498db'}}
                  ]
               }
            ]
         };
   
      } , 
      err=> console.log (err)
   )
    

  
    //Actual Achienvement 
    this.service.getFourGraph().subscribe(
       data=>{
          data.forEach(element => {
             this.planned_pers.push(element.planned_pers);
             this.percentage.push(element.percentage)
             this.financePrecentage.push(element.paid_pers)
             this.acualplanned_pers.push(element.spended_pers);
             this.mbarChartLabels4.push(element.contract_no);
             
          });
          this.barChartData4 = [
          {data:this.financePrecentage , label:"نسبة الانجاز المالية"},
          {data:this.percentage , label:"نسبة الإنجاز الفعلية"}  , 
          {data:this.planned_pers , label:"نسبةالإنجاز المخططة"} ,
          {data:this.acualplanned_pers , label:"المدة المنقضية"}]
       },
       err=>console.log(err)
    )

}

//for S curve 
public lineChartOptions :any = {
   responsive: true,
   maintainAspectRatio: false,
   scales: {
      yAxes: [{
         gridLines: {
           display: true,
           drawBorder: false
         },
         scaleLabel: {
            display: true,
            labelString: 'Cost'
         },
         ticks: {
           stepSize: 50
         }
       }],
      xAxes: [{
         gridLines: {
           display: false,
           drawBorder: false
         },
         scaleLabel: {
            display: true,
            labelString: 'Time'
         },
      }]
   },
   tooltip: {
      enabled: true
   },
   legend: {
      display: false
   },
}

   //line chart color
public color: Array <any> = [
   {
      lineTension: 0.4,
      borderColor: '#1565c0',
      pointBorderColor: '#1565c0',
      pointBorderWidth: 2,
      pointRadius: 7,
      fill: false,
      pointBackgroundColor: '#FFFFFF',
      borderWidth: 3
   }
];

  

}


