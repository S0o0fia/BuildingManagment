import { Component, OnInit, Inject } from '@angular/core';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';

@Component({
  selector: 'ms-modifyrole',
  templateUrl: './modifyrole.component.html',
  styleUrls: ['./modifyrole.component.scss']
})
export class ModifyroleComponent implements OnInit {

  role: any;
  rolename : string;
  description : string;
  roleid : number ;
  activityrights: any []=[];
  activities : any [] = []
  newArray: any[]=[];
  assignedRights: any[]=[];
  constructor(public dialogRef: MatDialogRef<RoleManagementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , public  services :CoreService){
      dialogRef.disableClose = true;
    }

  ngOnInit() {

    this.services.getRole(this.data).subscribe(
      data=>{
        this.role = data as any ;
        console.log(this.role) ;
        this.roleid=this.role[0].id;
        this.rolename=this.role[0].name;
        this.description=this.role[0].description;
        this.role[0].activity_ids.forEach(element => {
          this.assignedRights.push(element.id);
        });
      },
     err=>console.log(err)
    );

    this.services.getActivityRights().subscribe(
      data=>{
        this.activityrights = data as any[] ;
        debugger;
        this.assignedRights.forEach(e=>{
        this.activityrights.forEach(element=>{
            if(element.id==e){
              element.Checked=true;
            }
            else{
              element.Checked=false;
            }
          });
        });
        console.log(this.activityrights) ;
      },
     err=>console.log(err)
    );
  }

  choose(val)
  {
    //this.userjob = val;
  }

  getCheckboxValues(ev, data) {
    let obj = {
      "order" : data
    }
    if(data.Checked){
      // Pushing the object into array
      this.newArray.push(obj);
      this.activities.push(data.id);
    }else {
      let removeIndex = this.newArray.findIndex(itm => itm.order===data);

      if(removeIndex !== -1)
        this.newArray.splice(removeIndex,1);
        this.activities.splice(removeIndex,1);
    }

    //Duplicates the obj if we uncheck it
    //How to remove the value from array if we uncheck it
    console.log(this.newArray);
  }

  Save()
  {
    this.role = {
      role_id : this.roleid, 
      activity_id : this.activities
    }

   

    this.services.modifyRole(this.role).subscribe(
      data=>{
        let msg = this._snackBar.open('تم إنشاء المستخدم بنجاح' , 'إالغاء')
        if(msg)
        {
          location.reload();
        }
      },
      err=>console.log(err)
    );
  }

}
