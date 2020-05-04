import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProjectscheduleComponent } from '../projectschedule/projectschedule.component';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-modifyprojectschedule',
  templateUrl: './modifyprojectschedule.component.html',
  styleUrls: ['./modifyprojectschedule.component.scss']
})
export class ModifyprojectscheduleComponent implements OnInit {
  id:any;
  name: any;
  percentage : any;
  schedule: any[]=[];
  constructor(public dialogRef: MatDialogRef<ProjectscheduleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    debugger;
    this.services.getPSchedule(this.data).subscribe(
      data=>{
        this.schedule = data as any;
        this.name=this.schedule[0].name;
        this.percentage=this.schedule[0].percentage;
        console.log(this.schedule[0]) ;

      },
     err=>console.log(err)
    );    
}

Save()
  {
    let schedule={
      "id":this.data,
      "name":this.name,
      "percentage":this.percentage
    }
    this.services.modifySchedule(schedule).subscribe(
      (data)=>{
        //console.log(data);
        let msg = this._snackBar.open('تم منح الصلاحية بنجاح' , 'إالغاء');
        if(msg)
        {
          location.reload();
        }
      },
      err=>{
        console.log(err);
        let msg = this._snackBar.open('تم منح الصلاحية بنجاح' , 'إالغاء');
        location.reload();
      }
    );
  }
}
