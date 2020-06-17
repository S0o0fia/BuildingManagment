import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import {pieChartDemoData} from 'app/Models/chart-data'
import { stackedAreaChartData } from "app/Models/stackedAreaChart.data";
import * as pbi from 'powerbi-client';  
import { CoreService } from 'app/Service/core/core.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
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
        }
     ];
    
       public barChartColors1:Array<any> = [
           { 
             backgroundColor: '#02bc77',
             borderColor: '#02bc77',
             pointBackgroundColor: 'rgba(77,20,96,1)',
             pointBorderColor: '#fff',
             pointHoverBackgroundColor: '#fff',
             pointHoverBorderColor: '#02bc77'
           }
        ];
    
        public barChartColors2:Array<any> = [
          { 
            backgroundColor: '#02bc77',
            borderColor: '#02bc77',
            pointBackgroundColor: 'rgba(77,20,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#02bc77'
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
   
     ngOnInit() {
 
    this.service.getRFIChartProject().subscribe(
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
             backgroundColor: ['#00acac' , '#02bc77','#0070d1', '#f59c1a', '#ff3db4']  }];
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
    this.service.getCountChartProject().subscribe(
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
                   backgroundColor: ['#00acac','#0070d1', '#f59c1a', '#ff3db4'] }];
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
    this.service.getDoneContractProject().subscribe(
       data=> {
         data.forEach(element => {
            this.mbarChartLabels1.push(element.contract_no);
            this.percentage.push(element.percentage);
            this.planned_pers.push(element.planned_pers);
            this.total_excuted.push(element.total_excuted); 
             
         });
 
         this.barChartData = [ {data : this.percentage , label : "النسبة" } ,
         {data : this.planned_pers , label : "النسبة المخطط لها"} ];
       
       },
 
       err=>console.log(err)
    )
    //SPI
     this.service.getSPIProject().subscribe(
        data=>{
           data.forEach(element => {
              this.mbarChartLabels2.push(element.contract_no);
              this.SPI.push(element.SPI);
           },
            this.barChartData1 = [{data: this.SPI , label:"نسبة القيمة المكتسبة"}]
 
           );
        },
        err=>console.log(err)         
     );
 
     //Finance
     this.service.getfianaceProject().subscribe(
        data=>{   
          data.forEach(element => {
            this.mbarChartLabels2.push(element.contract_no);
             this.financePrecentage.push(element.percentage);
          })
          this.barChartData2 = [{data:this.financePrecentage , label:"النسبة"}]
        },
        err=>console.log(err)
     )
      this.pageTitleService.setTitle("المنصة التفاعلية");
      
     //techinacal perscentage 
     this.service.getTechPercentProject().subscribe(
        data=>
        {
         data.forEach(element => {
            this.techPrecentage.push(element.percentage);
            this.mbarChartLabels3.push(element.contract_no);
         });
         this.barChartData3 = [{data:this.techPrecentage , label:"النسبة"}]
        },
        err=>console.log(err)
 
     )
 
 
     //Actual Achienvement 
     this.service.getacualachieveProject().subscribe(
        data=>{
           data.forEach(element => {
              this.acualpercentage.push(element.percentage);
              this.acualplanned_pers.push(element.planned_pers);
              this.mbarChartLabels4.push(element.contract_no);
              
           });
           this.barChartData4 = [{data:this.acualpercentage , label:"النسبة"} ,
           {data:this.acualplanned_pers , label:"النسبة المخطط لها"}]
        },
        err=>console.log(err)
     )
 
 }
 
 


}


