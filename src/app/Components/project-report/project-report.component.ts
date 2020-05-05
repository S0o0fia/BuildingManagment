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
   //Data
   
   public barChartData:any[] = [];
   public barChartData1:any[]=[];
   public barChartData2:any[]=[];
   public barChartData3:any[]=[{data:[120] , label:"Planned completion"}];
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
    
  public percent3: number;
 
  public options3: any;

 
   //Color
   public barChartColors:Array<any> = [
      {
        backgroundColor: 'rgb(66, 104, 113)',
        borderColor: 'rgb(66, 104, 113)',
        pointBackgroundColor: 'rgba(105,159,177,1)',
        pointBorderColor: '#fafafa',
        pointHoverBackgroundColor: '#fafafa',
        pointHoverBorderColor: 'rgb(66, 104, 113)'
      },
      { 
         backgroundColor: 'rgb(208, 174, 74)',
         borderColor: 'rgb(208, 174, 74)',
         pointBackgroundColor: 'rgba(77,20,96,1)',
         pointBorderColor: '#fff',
         pointHoverBackgroundColor: '#fff',
         pointHoverBorderColor: 'rgb(208, 174, 74)'
       }
    ];
   
      public barChartColors1:Array<any> = [
          { 
            backgroundColor: 'rgb(66, 104, 113)',
            borderColor: 'rgb(66, 104, 113)',
            pointBackgroundColor: 'rgba(77,20,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(208, 174, 74)'
          }
       ];
   
       public barChartColors2:Array<any> = [
         { 
           backgroundColor: 'rgb(162, 98, 60)',
           borderColor: 'rgb(162, 98, 60)',
           pointBackgroundColor: 'rgba(77,20,96,1)',
           pointBorderColor: '#fff',
           pointHoverBackgroundColor: '#fff',
           pointHoverBorderColor: 'rgb(162, 98, 60)'
         }
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
        barColor: '#426871',
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
          backgroundColor: ['#426871', '#478a99' ,'#197bd1', '#d0ae4a', '#a2623c']

     
  
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
                  backgroundColor: ['#426871','#197bd1', '#d0ae4a', '#a2623c'] }];
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
    

   //Done Contarct 
   this.service.getDoneContract().subscribe(
      data=> {
        data.forEach(element => {
           this.mbarChartLabels1.push(element.contract_no);
           this.percentage.push(element.percentage);
           this.planned_pers.push(element.planned_pers);
           this.total_excuted.push(element.total_excuted); 
            
        });

        this.barChartData = [ {data : this.percentage , label : "Precentage" } ,
        {data : this.planned_pers , label : "Planned Precentage"} ];
      
      },

      err=>console.log(err)
   )
   //SPI
    this.service.getSPI().subscribe(
       data=>{
          data.forEach(element => {
             this.mbarChartLabels2.push(element.contract_no);
             this.SPI.push(element.SPI);
          },
           this.barChartData1 = [{data: this.SPI , label:"SPI"}]

          );
       },
       err=>console.log(err)         
    );

    //Finance
    this.service.getfianace().subscribe(
       data=>{   
         data.forEach(element => {
           this.mbarChartLabels2.push(element.contract_no);
            this.financePrecentage.push(element.percentage);
         })
         this.barChartData2 = [{data:this.financePrecentage , label:"Precentage"}]
       },
       err=>console.log(err)
    )
     this.pageTitleService.setTitle("المنصة التفاعلية");
     


}



}


