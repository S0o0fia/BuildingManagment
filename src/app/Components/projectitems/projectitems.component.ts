import { Component, OnInit } from '@angular/core';
import { Projectitem } from '../../Models/ProjectItem/projectitem'
import { CoreService } from 'app/Service/core/core.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ms-projectitems',
  templateUrl: './projectitems.component.html',
  styleUrls: ['./projectitems.component.scss']
})
export class ProjectitemsComponent implements OnInit {

  itemtype : number ;
  item_name : string;
  type_name : string;
  itemsData : Projectitem [] = [];
  type : any =[];
  projectid : number;
  projectname : string;
  
  constructor(private services : CoreService, private _snackBar : MatSnackBar)
 { 

  this.projectname = localStorage.getItem('projectname');
 }

  ngOnInit() {
    this.services.getProjectitemtype().subscribe(
      data=>this.type = data,
      err=> console.log(err)
    );
    this.projectid = +localStorage.getItem('projectid');
  }

  addItem ()
  {
  
    this.itemsData.push({
       name : this.item_name , 
       type_id : this.itemtype , 
       project_id : this.projectid ,
       type_name : this.type_name
    });
  }
  addname(val)
  {
    this.type_name = val;
  }

  removeitem(index)
  {
    if(index != 0)
    this.itemsData.splice(0  , index);
    else
    this.itemsData.pop();
  }

  SaveData()
  {
    this.itemsData.forEach(element=>
      {
        this.services.addprojectitem(element).subscribe(
          data=>{
            console.log(data);
            let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
            location.reload();
          },
          err=>console.log(err)
        );
      })
  }

  //the Stack bar Method 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition : 'center' ,
      panelClass: ['my-snack-bar']
    });
    return true;
    
  }
}
