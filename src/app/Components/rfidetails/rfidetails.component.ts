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

@Component({
  selector: 'ms-rfidetails',
  templateUrl: './rfidetails.component.html',
  styleUrls: ['./rfidetails.component.scss']
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



   //open Approve Dialog
   openDialogApprove()
   {
    const dialogRef = this.dialog.open( SelectApproveComponent , {
      width: '50%',
      height :'40%',
      data : this.id
     
    });
   }

  //Action Method when click on the Approve Draft Button
  ApproveDraft()
  {
    this.state = "waiting"
    this.service.updateSate(this.state , this.id).subscribe(
      data=> console.log(data) , 
      err=> console.log(err)
    )
   this.openSnackBar("تم اعتماد المسودة","إغلاق");
  }

  ngOnInit() {
  
    //get Comments
    this.service.getComment(this.id    
      ).subscribe( data=> this.Comments = data , 
      err=> console.log(err));
        

    //getting R0FI Data 
    this.service.getRFI_tbl().subscribe(
     data => {
    
      console.log(data);
       data.forEach(element => {
            if(element.id == this.id)
           {this.RFI_tbl.push(element);
             this.state = element.state;
             this.consultant_approve = element.consultant_approval;
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
    
    this.Comment = {
      comments : this.details , 
  
      create_uid : this.user , 
      rfi_id : this.id , 
      section_id : this.typeid

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