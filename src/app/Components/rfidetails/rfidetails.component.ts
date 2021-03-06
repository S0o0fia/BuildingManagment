import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { EditContractedQunatityComponent } from '../edit-contracted-qunatity/edit-contracted-qunatity.component';
import { SelectApproveComponent } from '../select-approve/select-approve.component';
import { Approvedqty } from 'app/Models/Quantity/approvedqty';
import {Comment } from '../../Models/Comment/comment'
import { timeThursdays, Numeric } from 'd3';
import { DatePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-rfidetails',
  templateUrl: './rfidetails.component.html',
  styleUrls: ['./rfidetails.component.scss'],
  providers: [DatePipe] , 
  animations:[ trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('700ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
    ]),
    
    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ])
],

})

export class RfidetailsComponent implements OnInit {
  
   RFI : GetRFI[]=[];
   RFI_tbl : GetRFI[]=[];
   Items : NewItemRFI[]=[];
   user : string ;
   id : number;
   approve_draft : boolean ;
   contracted_qty : any[]=[];
   number_arr : Approvedqty[]=[];
    item_id : number;
   state : string;
   consultant_approve : string;
   consultant_btn : string;
   type : any = [];
   details : string;
   typeid : number;
   Comment : Comment;
   Comments : any = [];
   download : string;
   role : number ;
   boolconsultant : boolean = false ; 
   boolcontractor : boolean = false;
   commentsection : any [] =[];
   commentusers : any[] =[];
  preparedby: any;
  preparedon: any;
  activity_log: any[]=[];
  department : number;
  userid : number;
  request_number : string;
  comment : string = "";
  activity: any[]=[];
  boolcomment : boolean = false;
  constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
    ,private _snackBar: MatSnackBar ,public dialog: MatDialog, private datePipe: DatePipe) { 
    this.user = localStorage.getItem('loginUser');
     this.id = +( this.route.snapshot.paramMap.get('id') );
     this.approve_draft = false;
     this.role = +localStorage.getItem('Role');
    this.download = this.service.returnBase()+ "/attachment/get?db=nqproject&token="+localStorage.getItem('token')+"&attach_id=";

  
  }

  Typeid ( val )
  {
    this.typeid = val;
  }

  //function for calling Stackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition : 'center' ,
      panelClass: ['my-snack-bar']
    });
  }



   //open Approve Dialog
   openDialogApprove()
   {
    const dialogRef = this.dialog.open( SelectApproveComponent , {
      width: '50%',
      height :'40%',
      data :{  id : this.id , number : this.request_number }
     
    });
   }

  //Action Method when click on the Approve Draft Button
  ApproveDraft()
  {
    this.state = "waiting"
    this.service.updateSate(this.state , this.id).subscribe(
      data=> {console.log(data) , this.openSnackBar("تم اعتماد المسودة","إغلاق"); location.reload() }, 
      err=> console.log(err)
    )
   

  }

  ngOnInit() {

    this.service.getRole(this.role).subscribe(
      data=>{
            this.activity = data[0].activity_ids ;
            console.log(data)
            this.activity.forEach(element => {
               if(element.name == "approve rfi")
               {
                 this.boolconsultant = true;
               }
               if(element.name == "referral-rfi")
               {
                 this.boolcomment = true;
               }
            });
         } ,
         err=>console.log(err)
      )

    //get comment section
    this.service.getCommentSection().subscribe(
      data=>this.commentsection= data as any[] ,
      err=>console.log(err)
    )

    //get comment users 
    this.service.getCommentUsers().subscribe(
      data=> this.commentusers = data as any[] , 
      err=>console.log(err)
    )
  
    //get Comments
    this.service.getComment(this.id    
      ).subscribe( data=> this.Comments = data ,  
      err=> console.log(err));
        

    //getting R0FI Data 
    this.service.getRFI_tbl().subscribe(
     data => {
      console.log(data);
      //alert(JSON.stringify(data));
       data.forEach(element => {
            if(element.id == this.id)
           {
             
             this.RFI_tbl.push(element);
             this.state = element.state;
             this.consultant_approve = element.consultant_approval;
             this.request_number = element.request_num;
             this.comment = element.comment;
             
             //alert(element.activity_log.length);
             //element.activity_log.forEach(e=>{
              // this.preparedby=element.activity_log[0].action.split(':')[1];
              // this.preparedon=this.datePipe.transform(element.activity_log[0].date, 'dd-MM-yyyy');
            //   this.preparedby=e.action;
            //  this.preparedon=this.datePipe.transform(e.date, 'dd-MM-yyyy');            
             //});
             this.activity_log=element.activity_log;

             this.activity_log.forEach(e=>{
           console.log(e)
               e.action=e.action.replace(':','');
               e.date=this.datePipe.transform(e.date, 'dd-MM-yyyy');   
             });
             
             if(this.consultant_approve == "waiting")
             {
              this.consultant_btn = "Consultant Approve";
             }
             else
             {
              this.consultant_btn = "Consultant Approve Done";
             }

           }

       });
     },
      err=>console.log(err)
    );
    
    //Get The RFI's Items based in Rfi id 
    this.service.getItemRFI().subscribe(
      data =>
      {
       
        data.forEach(element => {
          if(element.rfi_id == this.id)
            {
              console.log(element);
              this.Items.push(element);
              this.contracted_qty[element['id'] ]=element.approved_qty;
              
             
              console.log(this.contracted_qty);
            }

        });
      }
    );

    //get Type of comments
    this.service.getType_forRFI().subscribe(
     data=> this.type = data , 
     err => console.log(err)
         
    );
  }

  Save()
  {
    debugger;
    this.Comment = {
      comments : this.details ,   
      create_uid : this.userid , 
      rfi_id : this.id , 
      section_id : this.department

    }

    //Cretate Comment
    this.service.CreateComment(this.Comment).subscribe(
      data=>{
        console.log(data) ;
        location.reload();
      } , 
      err=> console.log(err)
    );
   
  }
  //Action Method when click on Back Button 
  backtorfi()
  {
    this.router.navigate(['home/table/rfi']);
  }
}
