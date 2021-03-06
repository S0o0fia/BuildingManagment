import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-timesheetdetails',
  templateUrl: './timesheetdetails.component.html',
  styleUrls: ['./timesheetdetails.component.scss'],
  providers: [DatePipe],
  animations:[ trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('700ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
    ]),
    
    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ])
],
})
export class TimesheetdetailsComponent implements OnInit {

  user : string ;
  id : number;
  approve_draft : boolean ;
  role : number ;
  sheet:any[]=[];
  state: any;
  contract_id:any;
  download : string ;
  constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
    ,private _snackBar: MatSnackBar ,public dialog: MatDialog, private datePipe: DatePipe , public _snack:MatSnackBar) { 
    this.user = localStorage.getItem('loginUser');
     this.id = +( this.route.snapshot.paramMap.get('id') );
     this.approve_draft = false;
     this.role = +localStorage.getItem('Role');
     this.download = this.service.returnBase+"/attachment/get?db=nqproject&token="+localStorage.getItem('token')+"&attach_id=";
    }

  ngOnInit() 
  {
    this.service.getTimesheetDetails(this.id).subscribe(
      data => {
        this.sheet=data as any[];
        this.contract_id=this.sheet[0].contract_id;
        this.state = this.sheet[0].state;
        console.log(data);
      },
       err=>console.log(err)
     );
  }
  
  backtolist()
 {
   this.router.navigate(['home/timesheet',this.contract_id]);
 }

 boolconsultant : boolean = false;
 setstate()
  {
    this.service.setConsultantState(this.id , 'accepted').subscribe(
      data=>{
        this.boolconsultant = true; 
        let msg = this._snack.open('تم تعيين المهندس بنجاح' ,'إلغاء')
        if(msg)
        { 
          location.reload();}
        } , 
      err=>console.log(err)
    )
  }
}
