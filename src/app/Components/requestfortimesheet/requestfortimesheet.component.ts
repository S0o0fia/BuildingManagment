import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddtimesheetComponent } from '../addtimesheet/addtimesheet.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-requestfortimesheet',
  templateUrl: './requestfortimesheet.component.html',
  styleUrls: ['./requestfortimesheet.component.scss'] , 
  animations:[
   
    trigger('tabletoggle' , [
      transition(':enter', [
        style({ opacity: 0 }), animate('1000ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('1000ms', style({ opacity: 0 }))]
      )
    ]) 
    
  ] 
})
export class RequestfortimesheetComponent implements OnInit {
  totalRec : number; 
  page : number = 0;
  timesheet : any[] = [];
  statename : string = 'draft';
  contract_id : number;
  constructor(public services : CoreService , private route : ActivatedRoute ,   public router : Router,
    public dialog : MatDialog , public _snackbar : MatSnackBar) {
    this.contract_id = +( this.route.snapshot.paramMap.get('id') )
   }

  ngOnInit() {
    this.services.getTimesheet().subscribe(
      data=>{
        this.timesheet = data as any[] ; 
        console.log(this.timesheet);
        this.totalRec = this.timesheet.filter(t=>t.state=='draft').length;
        //alert(this.totalRec);
      }, 
      err=> console.log(err)
    );

    
  
  }

  state(val)
  {
    this.statename = val;
  
  }
  statereject(val)
  {
    this.statename = val;
  }

  openDialog()
  {
    const dialogRef = this.dialog.open(AddtimesheetComponent, {
      width: '80%',
      height: '80%'
     
    });
  }
  back()
  {
    this.router.navigate(['/home/ConsultantContracts']);
  }

  approve(id)
  {
     this.services.setConsultantState(id , 'accepted').subscribe(
       data=>{
         this._snackbar.open('تم اعتماد المسودة','إلغاء');
         location.reload();
       },
       err=>console.log(err)
     )
  }

  reject(id)
  {
    this.services.setConsultantState(id , 'rejected').subscribe(
      data=>{
        this._snackbar.open('تم رفض المسودة','إلغاء');
        location.reload();
      },
      err=>console.log(err)
    )
  }

  tsdetails(id){
    this.router.navigate(['home/tsdetails',id]);
  }
}
