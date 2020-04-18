import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { CrmComponent } from './Components/crm/crm.component';
import { CreatprojectComponent } from './Components/creatproject/creatproject.component';
import { QuantitytableComponent } from './Components/quantitytable/quantitytable.component';
import { RequestForInspectionComponent } from './Components/request-for-inspection/request-for-inspection.component';

import { ActivestageComponent } from './Components/activestage/activestage.component';
import { AttendeceComponent } from './Components/attendece/attendece.component';
import { AuthGuard } from './Components/core/guards/auth.guard';
import { VideosComponent } from './Components/videos/videos.component';
import { EditProjectComponent } from './Components/edit-project/edit-project.component';
import { FileManagementComponent } from './Components/file-management/file-management.component';
import { RquestforRecieveItemsComponent } from './Components/rquestfor-recieve-items/rquestfor-recieve-items.component';
import { ExractsComponent } from './Components/exracts/exracts.component';
import { AddExtractComponent } from './Components/add-extract/add-extract.component';
import { ProjectsmapComponent } from './Components/projectsmap/projectsmap.component';
import { RfidetailsComponent } from './Components/rfidetails/rfidetails.component';
import { ProjectitemsComponent} from './Components/projectitems/projectitems.component';
import { UnderdevelopmentComponent } from './Components/underdevelopment/underdevelopment.component';
import { MirapproveComponent } from './Components/mirapprove/mirapprove.component';
import { ApproveQuantitiesComponent } from './Components/approve-quantities/approve-quantities.component';
import { CollectTableComponent } from './Components/collect-table/collect-table.component';
import { CountdetailsComponent } from './Components/countdetails/countdetails.component';
import { CountitemdetailsComponent } from './Components/countitemdetails/countitemdetails.component';
import { ExtractdetailsComponent } from './Components/extractdetails/extractdetails.component';
import {  NgbCalendarIslamicUmalqura, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { UserslistComponent } from './Components/userslist/userslist.component';



const appRoutes: Routes = [
   {	
      path: '',
      component:LoginComponent
   },
   {
      path: 'home',
      component:MainComponent,
      canActivate: [AuthGuard],
      
      children: [
       
         {
            path: "crm",
            component : CrmComponent
         },
         {
            path:"createproject",
            component:CreatprojectComponent
         } ,
         {
            path:"attendece",
            component:AttendeceComponent
         } ,
         {
           path:"userlist" , 
           component : UserslistComponent 
         },
         {
            path : "approvedqty" , 
            component : ApproveQuantitiesComponent
         },
         {
            path:'items',
            component:ProjectitemsComponent
         },
         {
            path:"activestage",
            component:ActivestageComponent
         } ,
         {
            path : 'under' ,
            component : UnderdevelopmentComponent
         } ,
         {
            path:'table',
            children :[{
               path:'quantity',
               component:QuantitytableComponent
            },
            {
               path:'rfi',
               component:RequestForInspectionComponent
            }
            , {
               path:'rfidetails/:id',
               component:RfidetailsComponent
            },
            {
               path:'countitemdetails/:id',
               component:CountitemdetailsComponent
            },
            
            {
               path:'receiveitem',
               component:RquestforRecieveItemsComponent
            },
            {
               path:'collect',
               component:CollectTableComponent
            },
            {
               path:'countdetails',
               component:CountdetailsComponent
            },
                          
            {
               path:'mirdetails/:id',
               component:MirapproveComponent
            },
          
         ]
         },
         {
            path:'videos',
            component:VideosComponent
         } ,
         
        

         {
            path:'edit',
            component:EditProjectComponent
         }
         , {
            path:'filemanagement',
            component:FileManagementComponent
         }
        ,
         {
            path:'projectsmap',
            component:ProjectsmapComponent
         }
         , {
            path:'abstracts',
            component:ExractsComponent
         }
         , {
            path:'abstractsdetials/:id',
            component:ExtractdetailsComponent
         }
         , {
            path:'addextract',
            component:AddExtractComponent
         }
        
      ]
   },
  
     
   {
      path: '**',
      redirectTo: '/'
   }
]

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes)],
 	exports: [RouterModule],
  	providers: [
     
     ]
})
export class RoutingModule { }
