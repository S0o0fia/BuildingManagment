import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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
      state: 'projectreport',
      name: 'Project Report',
      type: 'link',
      icon: 'note',
  
     
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
     state: 'projectreport',
     name: 'Project Report',
     type: 'link',
     icon: 'note',
 
    
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
     state: 'projectreport',
     name: 'Project Report',
     type: 'link',
     icon: 'note',
 
    
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
@Injectable()
export class MenuItems {
  getAll(): Menu[] {
     let role = +localStorage.getItem('Role');
     if(role == 2 )
     return MENUITEMSConsultant 
     else if (role == 3) 
     return MENUITEMSContractor 
      else 
      return MENUITEMSAdmin

  }
 
}
