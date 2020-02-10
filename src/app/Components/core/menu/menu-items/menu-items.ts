import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
   {
    state: 'crm',
    name: 'Home',
    type: 'link',
    icon: 'home',
   
  },
  {
      state: 'createproject',
      name: 'New Project',
      type: 'link',
      icon: 'create_new_folder',
     
    },
    {
      state: 'attendece',
      name: 'Attendece',
      type: 'link',
      icon: 'access_alarm',
     
    },
    {
      state: 'projectsmap',
      name: 'Project Maps',
      type: 'link',
      icon: 'location_on',
     
    },
    
  
   
    {
      state : 'approvedqty',
      name : 'Approved Quantities' ,
      type : 'link',
      icon : 'check_box' 

    },
    {
      state: 'settings',
      name: 'Global Setting',
      type: 'sub',
      icon: 'settings',
      children: [
        {state: 'accounts', name: 'Accouting',   type: 'link'  },
        {state: 'permission', name: 'Permission',   type: 'link' },
        {state: 'compantmanage', name: 'Company Managment',   type: 'link' },  
      ]
      }
      ,
      {
        state: 'logout',
        name: 'Logout',
        type: 'link',
        icon: 'exit_to_app'
       
      } 
]

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
 
}
