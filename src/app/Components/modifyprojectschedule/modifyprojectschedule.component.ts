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
  name: any;
  percentage : any;
  constructor(public dialogRef: MatDialogRef<ProjectscheduleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.name=this.data.name;
    this.percentage=this.data.percentage;
}

Save()
  {
    let schedule={
      "id":this.data.id,
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
