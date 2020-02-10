import { Component, OnInit } from '@angular/core';
import { Projectitem } from '../../Models/ProjectItem/projectitem'
import { CoreService } from 'app/Service/core/core.service';

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
  
  constructor(private services : CoreService)
 { }

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
          data=>console.log(data),
          err=>console.log(err)
        );
      })
  }
}
