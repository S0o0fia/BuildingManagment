import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ms-timesheetdetails',
  templateUrl: './timesheetdetails.component.html',
  styleUrls: ['./timesheetdetails.component.scss'],
  providers: [DatePipe]
})
export class TimesheetdetailsComponent implements OnInit {

  user : string ;
  id : number;
  approve_draft : boolean ;
  role : number ;
  state: any;
  constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
    ,private _snackBar: MatSnackBar ,public dialog: MatDialog, private datePipe: DatePipe) { 
    this.user = localStorage.getItem('loginUser');
     this.id = +( this.route.snapshot.paramMap.get('id') );
     this.approve_draft = false;
     this.role = +localStorage.getItem('Role');
    }

  ngOnInit() 
  {
    this.service.getTimesheetDetails(this.id).subscribe(
      data => {
     console.log(data);
      },
       err=>console.log(err)
     );
  }

}
