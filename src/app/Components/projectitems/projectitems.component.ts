import { Component, OnInit } from '@angular/core';
import { Projectitem } from '../../Models/ProjectItem/projectitem'

@Component({
  selector: 'ms-projectitems',
  templateUrl: './projectitems.component.html',
  styleUrls: ['./projectitems.component.scss']
})
export class ProjectitemsComponent implements OnInit {

  itemtype : string ;
  item_name : string;
  itemsData : Projectitem [] = [];
  constructor() { }

  ngOnInit() {
  }

  addItem ()
  {
    this.itemsData.push({
       itemname : this.item_name , 
       itemtype : this.itemtype
    });
  }

  removeitem(index)
  {
    if(index != 0)
    this.itemsData.splice(0  , index);
    else
    this.itemsData.pop();
  }
}
