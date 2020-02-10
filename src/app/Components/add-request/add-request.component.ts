import { Component, OnInit, Inject } from '@angular/core';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Rfi } from 'app/Models/RFI/rfi';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { InspctionId } from 'app/Models/inspction_id/inspction-id';
import { FileUploader , FileSelectDirective } from 'ng2-file-upload';
const uri = 'D:/Users/Documents/برنامج إدارة المرافق/src/files';
@Component({
  selector: 'ms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  
  minDate : Date;
  maxDate : Date;
  req_number : string;
  item_number : string;
  item_name : string;
  qty : number;
  types : any =[];
  itemDate : NewItemRFI[]=[];
  typename : number;
  start_work : Date = new Date();
  end_work : Date = new Date();
  insepction_date : Date = new Date();
  quantitys : any = [];
  work_id : string;
  newRFI : Rfi;
  inspection_id : number;
  inspectionIDs : InspctionId;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  item_id : number;
  buildings : any[]=[];
 //upload file
  uploader: FileUploader = new FileUploader({url: uri});
  AttachList : any = [];  
  selectedfile = null;
  pitem : string="";
  statepitem : boolean  = false;
  filter : number = 0;
  search : string;
  value : string;

   filterType(val)
    {
       this.filter = val;
    }
  

    Search()
    {
      console.log(this.filter);
      console.log(this.search);
       this.quantitys.forEach(element=>
        {
        
          if(this.filter == 1)
          {
              if(this.search == element['item_name'])
              {
                console.log(this.search == element['item_name'])
                 this.BindItemname(element['item_name'] , element['id']);
                 this.BindItemnumber(element['item_number'] , element['id']);
              }

          }
          else if(this.filter == 2)
          {
            
            if(this.search == element['item_number'])
            {
              console.log(this.search == element['item_number'])
              this.BindItemname(element['item_name'] , element['id']);
              this.BindItemnumber(element['item_number'] , element['id']);
            }
             
          }

        });
     
    }

  onFileSelected(event)
  {
    this.selectedfile =<File> event.target.files[0];
  }

  change()
  {
    this.statepitem = true;

  }
  
  onUpload()
  {
     const fd = new FormData();
    
     fd.append('file' , this.selectedfile , this.selectedfile.name);
     this.services.UploadFile(fd).subscribe(
       res=>console.log(res),
       err=>console.log(err)
     );
  }
     /**
      *fileOverBase fires during 'over' and 'out' events for Drop Area.
      */
     fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
  }

  /**
    *fileOverAnother fires after a file has been dropped on a Drop Area.
    */
  fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
  }
  constructor(   public dialogRef: MatDialogRef<RequestForInspectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rfi,private _snackBar: MatSnackBar
    ,private translate : TranslateService , private  services :CoreService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);



      this.uploader.onCompleteItem = (item : any , response : any , status : any , header : any)=>
      {
            this.AttachList.push(JSON.parse(response));
      }
    }
  	//Method to fill the Table of items
    addItem()
    {
      this.itemDate.push({
        rfi_id : 0 ,
        name : this.item_name , 
        num : this.item_number ,
        item_id : this.item_id ,
        qty : this.qty ,
        approved_qty: 0,
        pitem :this.pitem
      });
    }

    //this to get the request number from the from 
    request(value)
    {
      this.req_number = value;
     


    }
    //Method Action To remove item when click on delete icon on items Tables 
    

    //Action Method when click Cancel button
  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    //to het the type of work
    this.services.getType_forRFI().subscribe(
      data => this.types = data , 
      err=>console.log(err)
    );
   
    //to get the item fro Qty-tble based on id of work type 
    this.services.getQty_tbl().subscribe(
      data=> {this.quantitys = data ;
        
      }, 
      err => console.log(err)
    );

    this.services.getProjectitem().subscribe(
      data=> this.buildings = data as any, 
      err=> console.log(err)
    );

    
  }
  
  //to get the selected item name  binding with its number
  BindItemname(value , id)
  {
    this.item_name = value;
    this.item_id = id;
  }

  //to get the seleced item number binding with its name
  BindItemnumber(value , id)
  {
    this.item_number = value;
    this.item_id = id;
  }
  
  //when you click Save Button
  Save()
  {
    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    let startdate= formatDate(this.start_work, format, locale);
    let endate=formatDate(this.end_work, format, locale);
      let inspectiondate= formatDate(this.insepction_date, format, locale);
      console.log(this.work_id);
     this.newRFI = {
              id : 0 ,
              end_date : startdate,
              inspect_date : endate ,
              request_name:"",    
                     
              request_ids : this.typename , 
              request_num : this.req_number , 
              start_date : inspectiondate ,
              work_location : this.work_id,
              item_name:"",
              item_number:"",
              item_qty : 0,
             
     }

     this.services.createRFi(this.newRFI).subscribe(
       data=> {
                  this.inspectionIDs = data as InspctionId;
                  this.itemDate.forEach(element => {
                    element.rfi_id = this.inspectionIDs.inspection_id ,
                    element.approved_qty = element.qty
                    this.services.createItemRFI(element).subscribe(
                      data=>{
                         //function for calling Stackbar
                        let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
                        if(msg)
                        {
                          location.reload();
                        }
                      },
                      err=>console.log(err)
                    )
                  });
                  
               },
       err=> console.log(err)
     );
     
  }

  //the Stack bar Method 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition : 'center' ,
      panelClass: ['my-snack-bar']
    });

    return true;
    
  }
}
