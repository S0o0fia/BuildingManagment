import { Component, OnInit } from '@angular/core';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { Approvedqty } from 'app/Models/Quantity/approvedqty';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { EditContractedQunatityComponent } from '../edit-contracted-qunatity/edit-contracted-qunatity.component';
import { SelectApproveComponent } from '../select-approve/select-approve.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Miritems } from 'app/Models/MIR Request/miritems';
import { DatePipe } from '@angular/common';
import { Comment } from 'app/Models/Comment/comment';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-mirapprove',
  templateUrl: './mirapprove.component.html',
  styleUrls: ['./mirapprove.component.scss'],
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
export class MirapproveComponent implements OnInit {

 //mir variables 
 itemMir : Miritems[]=[];
 getMIR : any = [];
  user : string ;
  id : number;
  approve_draft : boolean ;
  contracted_qty : any[]=[];
  number_arr : Approvedqty[]=[];
   item_id : number;
    state : string;
  consultant_approve : string;
  consultant_btn : string;
  detail : string = "";
  role : number ;
  boolconsultant : boolean = false ; 
  boolcontractor : boolean = false;
  activity_log: any[]=[];
  department : number;
  userid : number;
  details : string;
  commentsection : any [] =[];
  commentusers : any[] =[];
  Commentt : Comment;
  Comments : any []=[]; 
  activity : any[]=[];
  submitmir : boolean = false;
  approvemir :boolean = false;
  boolcomment : boolean = false;
 constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
   ,private _snackBar: MatSnackBar ,public dialog: MatDialog, private datePipe: DatePipe) { 
   this.user = localStorage.getItem('loginUser');
    this.id = +( this.route.snapshot.paramMap.get('id') );
    this.approve_draft = false;
    this.role = +localStorage.getItem('Role');

 
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

 //openDialog to edit Approved Qunatity 
 openDialog(qid): void {
   console.log(qid);
   const dialogRef = this.dialog.open(EditContractedQunatityComponent, {
     width: '20%',
     height :'30%',
     data: this.contracted_qty[qid]
     
   }
 
   );

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     this.contracted_qty[qid] = result;
     this.number_arr.push({
       id : qid , 
       approved_qty :  this.contracted_qty[qid]

     });
   
   });
   console.log(this.number_arr);
 }
  //open Approve Dialog
  openDialogApprove()
  {
   const dialogRef = this.dialog.open( SelectApproveComponent , {
     width: '50%',
     height :'40%',
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     this.consultant_approve = result;
     this.state = result;
     this.consultant_btn = "Consultant Approve Done";
     this.service.createConsultantApproveMIR(this.id , this.state , this.consultant_approve).subscribe(
       data=> console.log(data) , 
       err=> console.log(err)
     );

     this.number_arr.forEach(element => {
       console.log(element);
       this.service.mirApprovedqty(element).subscribe(
         data=>console.log(data) , 
         err=> console.log(err)
       )
       
     });
     this.openSnackBar("تم اعتماد الطلب من قبل الاستشاري","إغلاق");
     
   });
  }
 //Action Method when click on the Approve Draft Button
 ApproveDraft()
 {
   this.state = "waiting"
   this.service.updateSateMir(this.state , this.id).subscribe(
     data=> console.log(data) , 
     err=> console.log(err)
   )
  this.openSnackBar("تم اعتماد المسودة","إغلاق");
 }
 ngOnInit() {
  
  
  this.service.getRole(this.role).subscribe(
    data=>{
      this.activity = data[0].activity_ids;
      this.activity.forEach(element => {
     
        if(element.name == "submit-mir")
        {
          this.submitmir = true;
        }
        if(element.name == "approve-mir")
        {
          this.approvemir = true;
        }
        if(element.name == "referral-mir")
        {
          this.boolcomment = true;
        }
            
               
      });
    });

  
    //comment Mir 
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
   this.service.getCommentFormir(this.id    
    ).subscribe( data=> this.Comments = data as any[], 
    err=> console.log(err));

   //getting MIR Data 
   this.service.getMIR().subscribe(
    data => {
      data.forEach(element => {
           if(element.id == this.id)
          {
            this.getMIR.push(element);
            this.state = element.state;
            this.consultant_approve = element.consultant_approval;
            this.activity_log=element.avtivities;

            this.activity_log.forEach(e=>{
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
   this.service.getMirItem().subscribe(
     data =>
     {
       data.forEach(element => {
         if(element.mir_id == this.id)
           {
             console.log(element);
             this.itemMir.push(element);
            
             if(element.approved_qty.toString() == "")
             this.contracted_qty[element['id'] ]=element.qty;
            
             else
             this.contracted_qty[element['id'] ]=element.approved_qty;
            
             console.log(this.contracted_qty);
           }

       });
     }
   );
 }

 //Action Method when click on Back Button 
 backtorfi()
 {
   this.router.navigate(['home/table/receiveitem']);
 }

 Save()
 {
  this.Commentt = {
    comments : this.details , 
    section_id : this.department , 
    rfi_id : this.id , 
    create_uid : this.userid
  }

  //Cretate Comment
  this.service.CreateCommentFoMir(this.Commentt).subscribe(
    data=>{
      console.log(data) ;
      location.reload();
    } , 
    err=> console.log(err)
  );
 }
 
}