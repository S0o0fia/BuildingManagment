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
 //RFI CHART
   data : any[]=[];
   accepted  :number;
   aceeptedwithcomment :number;
   rejected:number;
   waiting:number;
   draft : number;
   newpieChartOptions :any;
   showChart : boolean;
   //Count Chart
   dataCount : any[]=[];
   acceptedc : number;
   rejectedc: number;
   waitingc : number;
   draftc:number;
   aceeptedwithcommentc:number;
   newpieChartOptions2 :any;


   //Four Values Chart
   planned_pers :any[]=[];
   percentage : any[]=[];
   financePrecentage : any[]=[];
   acualplanned_pers : any[]=[];
   mbarChartLabels4 :string[]=[];
   barChartData4 : any[]=[];

   //line Chart 
   public lineChartOptions :any = {
      responsive: true,
      maintainAspectRatio: false,
		scales: {
         yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            }
          }],
         xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
         }]
      },
		tooltip: {
			enabled: true
		},
		legend: {
			display: false
		},
   }
   

   public color: Array <any> = [
      {
         lineTension: 0.4,
         borderColor: '#1565c0',
         pointBorderColor: '#1565c0',
         pointBorderWidth: 2,
         pointRadius: 2,
         fill: false,
         pointBackgroundColor: '#FFFFFF',
         borderWidth: 3,
      },
      {
         lineTension: 0.4,
         borderColor: '#0097a7',
         pointBorderColor: '#0097a7',
         pointBorderWidth: 2,
         pointRadius: 2,
         fill: false,
         pointBackgroundColor: '#FFFFFF',
         borderWidth: 3,
      },
      {
         lineTension: 0.4,
         borderColor: '',
         pointBorderColor: '',
         pointBorderWidth: 2,
         pointRadius: 2,
         fill: false,
         pointBackgroundColor: '#FFFFFF',
         borderWidth: 3,
      
      }
   ];

   //options for Charts
   public barChartLegend:boolean = true;
   public barChartType:string = 'bar';
   public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };

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
       }
    ];

     // events
     public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
 constructor(public service:CoreService)
 {

 }
 ngOnInit() {
   setTimeout(()=>{
      this.showChart = true;
   },0)

       
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


ngAfterViewInit()
{
   this.barChartData4 = [
      {data:this.financePrecentage , label:"نسبة الانجاز المالية"},
      {data:this.percentage , label:"نسبة الإنجاز الفعلية"}  , 
      {data:this.planned_pers , label:"نسبةالإنجاز المخططة"} ,
      {data:this.acualplanned_pers , label:"المدة المنقضية"}]
}
}


