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

   public mbarChartLabels1 :string[] =[];
   public barChartType:string = 'bar';
    public percentage : number[]=[];
   public planned_pers : number []=[];
   public total_excuted : number []=[]; 
   public barChartLegend:boolean = true;
 
   public barChartColors:Array<any> = [
   {
     backgroundColor: 'rgb(21, 101, 192)',
     borderColor: 'rgb(21, 101, 192)',
     pointBackgroundColor: 'rgba(105,159,177,1)',
     pointBorderColor: '#fafafa',
     pointHoverBackgroundColor: '#fafafa',
     pointHoverBorderColor: 'rgba(105,159,177)'
   },
   { 
     backgroundColor: 'rgb(255, 71, 71)',
     borderColor: 'rgb(255, 71, 71)',
     pointBackgroundColor: 'rgba(77,20,96,1)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(77,20,96,1)'
   },
   { 
      backgroundColor: 'rgb(0, 172, 172)',
      borderColor: 'rgb(0, 172, 172)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
 ];
   public barChartData:any[] = [
   
   ];

   public barChartData1:any[]=[];
   public dara :any[] = [];
 
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
        {data : this.planned_pers , label : "Planned Precentage"} ,
        {data : this.total_excuted , label : "Total Excuted" }];
      
      },

      err=>console.log(err)
   )
   
    

     this.pageTitleService.setTitle("المنصة التفاعلية");
     


}



}


