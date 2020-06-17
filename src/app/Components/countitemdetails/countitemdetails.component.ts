import { Component, OnInit } from '@angular/core';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { Approvedqty } from 'app/Models/Quantity/approvedqty';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SelectApproveComponent } from '../select-approve/select-approve.component';
import { Countitem } from 'app/Models/Count/countitem';
import { DatePipe } from '@angular/common';
import { Comment } from 'app/Models/Comment/comment';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'ms-countitemdetails',
  templateUrl: './countitemdetails.component.html',
  styleUrls: ['./countitemdetails.component.scss'],
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
export class CountitemdetailsComponent implements OnInit {

  count : any[]=[];
  count1 : any[]=[];
 
  Items : any []=[];
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
  typeid : number;
  Comments : any = [];
  item:any;
  detail:any;
  Commentt:Comment;
  type_id: any;
  users: any=[];
  user_id: number;
  dimension:number;
  uom: string = "";
  approved_length: number = 0;
  approved_width: number = 0;
  approved_height: number = 0;
  approved_pers: number = 0;
  approve : number = 0;
  items : any []=[];
  updatedItems : any []=[];
  role : number ; 
  boolconsultant : boolean = false ; 
  boolcontractor : boolean = false ;
  activity_log: any[]=[];
  department : number;
  userid : number;
  details : string;
  commentsection : any [] =[];
  commentusers : any[] =[];
  description:any;
  qty:any;
  qty_length:any;
  qty_width:any;
  qty_height:any;
  qty_unit:any;
  qty_pers:any;
 constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
   ,private _snackBar: MatSnackBar ,public dialog: MatDialog, private datePipe: DatePipe) { 
   this.user = localStorage.getItem('loginUser');
    this.id = +( this.route.snapshot.paramMap.get('id') );
    this.approve_draft = false;
    this.role = +localStorage.getItem('Role');
 
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




 ngOnInit() {
  this.state=null;
  //get Type of comments
  this.service.getType_forRFI().subscribe(
    data=> this.type = data , 
    err => console.log(err)
        
   );

   //get users list
   this.service.getUsers().subscribe(
    data=>{this.users=data ;
  debugger
   },
    err=> console.log(err)
  );

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
   this.service.getCommentForCount(this.id    
    ).subscribe( data=> this.Comments = data , 
    err=> console.log(err));
 
   //getting R0FI Data 
   this.service.getCount().subscribe(
    data => {
   
      
      data.forEach(element => {
           if(element.id == this.id)
          {
            this.count.push(element);
            this.state = element.state;
            console.log('state: '+element.state);
            this.consultant_approve = element.state;
            this.uom=element.uom;
            this.dimension=element.dimension;
            if(this.consultant_approve == "waiting" || this.consultant_approve == "draft")
            {
             this.consultant_btn = "Consultant Approve";
            }
            else
            {
             this.consultant_btn = "Consultant Approve Done";
            }
            this.activity_log=element.activity_log;

            this.activity_log.forEach(e=>{
              e.action=e.action.replace(':','');
              e.date=this.datePipe.transform(e.date, 'dd-MM-yyyy');   
            });
          }

      });
    },
     err=>console.log(err)
   );
  

   this.service.getCountItem( this.id).subscribe(
     data =>
     {

      console.log(data);
       data.forEach(element => {
       
            
             this.Items.push(element);
           
          

       });
     }
   );

   if(this.role == 2)
   {
     this.boolconsultant = true ;
   }
   else if(this.role == 3)
   {
      this.boolcontractor = true;
   }
   else 
   {
     this.boolcontractor = false;
     this.boolconsultant = false;
   }
 }
 

 ApproveConsultant()
 {
    

     this.items.forEach(element => {
      this.service.approveCountQty(element.id, element.approved_qty, this.uom, 
        element.approved_length, element.approved_width, element.approved_height, element.approved_pers ,
         element.approved_unit).subscribe(
        data=>{
          this.openSnackBar("تم اعتماد حاسب الكميات المختص ","إغلاق"); 
          this.service.setCountState("accepted" , this.id).subscribe(
            data=> {
            
             console.log(data)
               // location.reload();
           } ,
            err=> console.log(err)
          )
       
        }, 
        err=> console.log(err)

      )
      
    });
 }

 ApproveDraft()
 {
  // this.service.setCountState("waiting" , this.id).subscribe(
  //   data=> {
  //     this.openSnackBar("تم اعتماد المسودة","إغلاق");
  //    // location.reload();
  //     console.log(data) },
  //   err=> console.log(err)
  // );

  debugger;

  this.Items.forEach(element => {
    let count_item={
      "id":element.id,
      "description":element.description,
      "qty":element.qty,
      "qty_length":element.qty_length,
      "qty_width":element.qty_width,
      "qty_height":element.qty_height,
      "qty_unit":element.qty_unit,
      "qty_pers":element.qty_pers
    }
    this.service.updatecountItem(count_item).subscribe(
      data=>{
        
     
      }, 
      err=> console.log(err)

    )
    
  });
  this.openSnackBar("تم اعتماد المسودة","إغلاق");
  this.service.setCountState("waiting" , this.id).subscribe(
    data=> {
    
      console.log(data)
      this.router.navigate(['home/table/countdetails']);
    } ,
    err=> console.log(err)
  )
  
 }
   
 //Action Method when click on Back Button 
 backtorfi()
 {
   this.router.navigate(['home/table/countdetails']);
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
    this.service.CreateCommentForCount(this.Commentt).subscribe(
      data=>{
        console.log(data) ;
        location.reload();
      } , 
      err=> console.log(err)
    );
   
  }

  Typeids ( val )
  {
    this.user_id = val;
  }

  updateItem(i){
    let index=this.Items.findIndex(x => x.count_id === i.count_id);
    this.Items.splice(index,1);
    i.qty=0;
    if(this.dimension ==1 ){
      i.qty = (i.qty_length*i.qty_unit)*i.qty_pers/100;
     
    }
    else if(this.dimension== 2){
      i.qty = (i.qty_length*i.qty_width*i.qty_unit)*i.qty_pers/100;
    

    }
    else{
      i.qty = (i.qty_height*i.qty_length*i.qty_width*i.qty_unit)*i.qty_pers/100;
    }

      this.Items.push(i);
  }

  calQty(i)
  {
    
    console.log(this.dimension);
    i.approved_qty=0;
    if(this.dimension ==1 ){
      i.approved_qty = (i.approved_length*i.approved_unit)*i.approved_pers/100;
     
    }
    else if(this.dimension== 2){
      i.approved_qty = (i.approved_length*i.approved_width*i.approved_unit)*i.approved_pers/100;
    

    }
    else{
      i.approved_qty = (i.approved_height*i.approved_length*i.approved_width*i.approved_unit)*i.approved_pers/100;
    }

     this.items.push(i);
    
    
    
    //this.calpercentage(i);
  }
}