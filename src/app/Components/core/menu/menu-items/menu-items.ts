import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CoreService } from 'app/Service/core/core.service';
import { service } from 'powerbi-client';
import { HttpClient } from '@angular/common/http';

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

const MENUITEMSAdmin = [
   {
    state: 'crm',
    name: 'Home',
    type: 'link',
    icon: 'home',

   
  },
  {
    state: 'projectslist',
    name: 'Projects List',
    type: 'link',
    icon: 'note',

   
  },
  {
      state: 'createproject',
      name: 'New Project',
      type: 'link',
      icon: 'create_new_folder',
     
     
    },
    {
      state: 'attendance',
      name: 'Attendance',
      type: 'link',
      icon: 'access_alarm',
     
     
    },
   
    {
      state : 'approvedqty',
      name : 'Approved Quantities' ,
      type : 'link',
      icon : 'check_box' ,
  

    },
  
    {
      state : 'ConsultantContracts',
      name : 'ConsultantContracts' , 
      type : 'link' , 
      icon : 'supervised_user_circle' ,
    
    },
    
   
    {
      state: 'settings',
      name: 'Global Setting',
      type: 'sub',
      icon: 'settings',
      children: [
        { state:'userlist', name: 'Accouting',   type: 'link'  },
        {state:'role-management' ,  name: 'Permission',   type: 'link' },
        {state: 'compantmanage', name: 'Company Managment',   type: 'link' },  
      ],
     
      }
      ,
      {
        state: 'logout',
        name: 'Logout',
        type: 'link',
        icon: 'exit_to_app' ,
    
       
      } 
]



const MENUITEMSConsultant = [
  {
   state: 'crm',
   name: 'Home',
   type: 'link',
   icon: 'home',

  
 },
 {
  state: 'projectslist',
  name: 'Projects List',
  type: 'link',
  icon: 'note',

 
},

   {
     state : 'ConsultantContracts',
     name : 'ConsultantContracts' , 
     type : 'link' , 
     icon : 'supervised_user_circle' ,
   
   },
   {
     state: 'attendance',
     name: 'Attendance',
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
     icon : 'check_box' ,
 

   },
  
     {
       state: 'logout',
       name: 'Logout',
       type: 'link',
       icon: 'exit_to_app' ,
   
      
     } 
]


const MENUITEMSContractor = [
  {
   state: 'crm',
   name: 'Home',
   type: 'link',
   icon: 'home',

  
 },
 {
  state: 'projectslist',
  name: 'Projects List',
  type: 'link',
  icon: 'note',

 
},
  
   {
     state: 'attendance',
     name: 'Attendance',
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
     icon : 'check_box' ,
 

   },
  
   {
    state: 'logout',
    name: 'Logout',
    type: 'link',
    icon: 'exit_to_app' ,

   
  } 
]


const RoleMenu = [] = [];
@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    


     return RoleMenu;

  }
 
}
