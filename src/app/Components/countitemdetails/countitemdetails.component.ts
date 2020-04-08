import { Component, OnInit } from '@angular/core';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { Approvedqty } from 'app/Models/Quantity/approvedqty';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SelectApproveComponent } from '../select-approve/select-approve.component';
import { Countitem } from 'app/Models/Count/countitem';

@Component({
  selector: 'ms-countitemdetails',
  templateUrl: './countitemdetails.component.html',
  styleUrls: ['./countitemdetails.component.scss']
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
  details : string;
  typeid : number;
  Comments : any = [];
  item:any;
  detail:any;
  Comment: { comments: string; create_uid: string; rfi_id: number; section_id: number; };
  type_id: any;
 
  
 constructor(private route:ActivatedRoute ,private router:Router , private service : CoreService 
   ,private _snackBar: MatSnackBar ,public dialog: MatDialog) { 
   this.user = localStorage.getItem('loginUser');
    this.id = +( this.route.snapshot.paramMap.get('id') );
    this.approve_draft = false;

 
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

  //get Type of comments
  this.service.getType_forRFI().subscribe(
    data=> this.type = data , 
    err => console.log(err)
        
   );

   //get Comments
   this.service.getCommentForCount(this.id    
    ).subscribe( data=> this.Comments = data , 
    err=> console.log(err));
 
   //getting R0FI Data 
   this.service.getCount().subscribe(
    data => {
   
    
      data.forEach(element => {
           if(element.id == this.id)
          {this.count.push(element);
            this.state = element.state;
            this.consultant_approve = element.state;
            if(this.consultant_approve == "waiting" || this.consultant_approve == "draft")
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
   debugger;
   //Get The RFI's Items based in Rfi id 
   this.service.getCountItem( this.id).subscribe(
     data =>
     {
      console.log(data);
       data.forEach(element => {
       
             console.log(element);
             this.Items.push(element);
           
            
            
          

       });
     }
   );

  
 }

 ApproveConsultant()
 {
     this.service.setCountState("accepted" , this.id).subscribe(
       data=> {
        this.Items.forEach(element => {
          this.service.approveCountQty(element.id , element.approved_qty).subscribe(
            data=>{
              this.openSnackBar("تم اعتماد حاسب الكميات المختص ","إغلاق"); 
              location.reload();
            }, 
            err=> console.log(err)
    
          )
          
        });
        console.log(data)
      } ,
       err=> console.log(err)
     )
 }

 ApproveDraft()
 {
  this.service.setCountState("waiting" , this.id).subscribe(
    data=> {
      this.openSnackBar("تم اعتماد المسودة","إغلاق");
      location.reload();
      console.log(data) },
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
    debugger;
    this.Comment = {
      comments : this.detail , 
  
      create_uid : this.user , 
      rfi_id : this.id , 
      section_id : this.type_id

    }

    //Cretate Comment
    this.service.CreateCommentForCount(this.Comment).subscribe(
      data=>{
        console.log(data) ;
        location.reload();
      } , 
      err=> console.log(err)
    );
   
  }

  Typeids ( val )
  {
    this.type_id = val;
  }
}