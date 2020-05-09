import { Component, OnInit, Inject } from '@angular/core';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Rfi } from 'app/Models/RFI/rfi';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { CoreService } from 'app/Service/core/core.service';
import { formatDate } from '@angular/common';
import { InspctionId } from 'app/Models/inspction_id/inspction-id';
import {map, startWith} from 'rxjs/operators';
import { FileUploader , FileSelectDirective } from 'ng2-file-upload';
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/Service/custompipe/format-datepicker';
import { AnimationQueryOptions } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
//import { threadId } from 'worker_threads';
const URL = 'http://nqraait.ddns.net:8070/api/test?db=nqproject&token='+localStorage.getItem('token');
@Component({
  selector: 'ms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    // {provide: APP_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
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
  uploader: FileUploader = new FileUploader({url: URL});
  AttachList : any = [];  
  
  selectedfile = null;
  pitem : string="";
  statepitem : boolean  = false;
  filter : number = 0;
  search : string;
  value : string;
  inspect_loc : string;
  avaible_qty : number;
  total : number=0;
  Visible : boolean = false;   
  price : number;
  total_price : number;             
base64:any;
BASE64_MARKER: string = ';base64,';
base64string:any;
  fileToUpload: File = null
  projectname : string ;
  fileExtension: string;
  image: any;
  imageSrc: any;
  filename: any;

  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredNumbers: Observable<string[]>;
  filteredNames: Observable<string[]>;

  itemName: any[]=[];
  itemNumber: any[]=[];
Project_list : any[] = [];
multi : boolean = false ;
  description: string;
 
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

  removeitem(index)
  {
    if(index != 0)
    this.itemDate.splice(0  , index);
    else
    this.itemDate.pop();
  }

   filterType(val)
    {
       this.filter = val;
    }
  

    Search()
    {
     
       this.quantitys.forEach(element=>
        {
        
          if(this.filter == 1)
          {
              if(this.search == element['item_name'])
              {
              
                 this.BindItemname(element['item_name'] , element['id']);
                 this.BindItemnumber(element['item_number'] , element['id']);
                 this.avaible_qty = element['item_qty']-element['excuted'];
                 this.price = element['price_unit']; 
                 console.log(this.avaible_qty)
              }

          }
          else if(this.filter == 2)
          {
            
            if(this.search == element['item_number'])
            {
            
              console.log(element);
              this.BindItemname(element['item_name'] , element['id']);
              this.BindItemnumber(element['item_number'] , element['id']);
              this.avaible_qty = element['item_qty']-element['excuted'];
              this.price = element['price_unit']; 
              console.log(this.avaible_qty)
            }
             
          }

        });
     
    }

  

  change()
  {
    this.statepitem = true;
     

  }

  onSelectFiles(evt) {
    let me = this;
  let file = evt.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
     me.base64 = reader.result;
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
     this.filename = evt.target.files[0].name;
  }
 
  
 
  
  constructor(   public dialogRef: MatDialogRef<RequestForInspectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rfi,private _snackBar: MatSnackBar
    ,private translate : TranslateService , private  services :CoreService) {
      this.minDate = new Date(1900,1,1);
      this.maxDate = new Date(2050,1,1);
     this.projectname = localStorage.getItem('projectname');

     dialogRef.disableClose = true;
      
    }
  	//Method to fill the Table of items
    addItem()
    {
      this.itemDate.push({
      rfi_id : 0 ,
      inspect_location : this.inspect_loc , 
      qty : this.qty , 
      approved_qty  : 0 , 
      total : this.total
      });
      
      this.inspect_loc = "";
      this.qty = null  
    

    }

    Visibles()
    {
      if(this.qty > this.avaible_qty)
      {
        this.Visible = true;
        console.log(this.Visible);
      }

      this.total = this.qty * this.price;
    }

    setVisible()
    {
      this.Visible = false;
      console.log(this.Visible);
      this.qty = 0 ; 
      this.total = 0; 
    }

    //this to get the request number from the from 
    request(value , type)
    {
      //alert("value: "+value+", type: "+type);
      this.req_number = value;

      this.Project_list.forEach(element => {
        if(element.project_type == "multi")
        {
           this.multi = true;
        }
        else 
        {
          this.multi = false;
        }
      });
      
      if(this.multi == true)
      {
           //to get the item fro Qty-tble based on id of work type 
           this.services.getQty_tbl().subscribe(
            data=> {

              this.quantitys = [];
              data.forEach(element => {

                if(element.main_section_name  == type)
                {
                  this.quantitys.push(element)
                }
              });
              this.filteredNumbers = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
      
            this.filteredNames = this.myControl1.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter1(value))
            );
            }, 
            err => console.log(err)
          );
      }

      else 
      
      {
        this.services.getQty_tbl().subscribe(
          data=> {
            this.quantitys = [];
              this.quantitys = data ;
              console.log("qty_tbl "+JSON.stringify(this.quantitys));
            this.filteredNumbers = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    
          this.filteredNames = this.myControl1.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter1(value))
          );
          }, 
          err => console.log(err)
        );
              }


    }
    //Method Action To remove item when click on delete icon on items Tables 
    

    request_main(value , type)
    {
      //alert("value: "+value+", type: "+type);
      this.req_number = value;

      this.Project_list.forEach(element => {
        if(element.project_type == "multi")
        {
           this.multi = true;
        }
        else 
        {
          this.multi = false;
        }
      });
      
      if(this.multi == true)
      {
           //to get the item fro Qty-tble based on id of work type 
           this.services.getQty_tbl().subscribe(
            data=> {

              this.quantitys = [];
              data.forEach(element => {

                if(element.main_section_name  == type)
                {
                  this.quantitys.push(element)
                }
              });
              this.filteredNumbers = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
      
            this.filteredNames = this.myControl1.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter1(value))
            );
            }, 
            err => console.log(err)
          );
      }

      else 
      
      {
        this.services.getQty_tbl().subscribe(
          data=> {
            this.quantitys = [];
              this.quantitys = data ;
              console.log("qty_tbl "+JSON.stringify(this.quantitys));
            this.filteredNumbers = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    
          this.filteredNames = this.myControl1.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter1(value))
          );
          }, 
          err => console.log(err)
        );
              }


    }

    //Action Method when click Cancel button
  onNoClick(): void {
    this.dialogRef.close();
  }
  private _filter(value: string): string[] {
    this.itemNumber=[];
    const filterValue = value.toLowerCase();
    this.quantitys.forEach(element=>
      {
       this.itemNumber.push({"id":element.id,"item_number":element.item_number,"item_name":element.item_name});
      });
    return this.itemNumber.filter(option => option.item_number.toLowerCase().includes(filterValue));
  }
  
  private _filter1(value: string): string[] {
    this.itemName=[];
    const filterValue = value.toLowerCase();
    this.quantitys.forEach(element=>
      {
       this.itemName.push({"id":element.id,"item_name":element.item_name,"item_number":element.item_number});
      });
    return this.itemName.filter(option => option.item_name.toLowerCase().includes(filterValue));
  }

  ngOnInit() {  

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('File:uploaded:'+this.uploader);
         console.log('File uploaded successfully');
    };

    this.services.getProject().subscribe(
      data=>{ this.Project_list = data as any[] ;
      
      console.log(this.Project_list);
      }, 
      err=>console.log(err)
    )

    

    //to het the type of work
    this.services.getType_forRFI().subscribe(
      data => this.types = data , 
      err=>console.log(err)
    );
   
  

    this.services.getProjectitem().subscribe(
      data=> this.buildings = data as any, 
      err=> console.log(err)
    );


    


    
  }

  
  
  //to get the selected item name  binding with its number
  BindItemname(value , id)
  {
    debugger;
    this.item_name = value;
    this.item_id = id;
  }

  //to get the seleced item number binding with its name
  BindItemnumber(value , id)
  {
    debugger;
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
   
     this.newRFI = {
              id : 0 ,
              end_date : startdate,
              inspect_date : endate ,
              request_name:"",    
              request_ids : this.typename , 
              request_num : this.req_number , 
              start_date : inspectiondate ,
              work_location : this.work_id,
             item_id : this.item_id , 
             pitem : this.pitem,
             //description : this.description
     }

     this.itemDate.forEach(element=>
      {
       this.total_price += element.total;
      });

      
     this.services.createRFi(this.newRFI).subscribe(
       data=> {
                  this.inspectionIDs = data as InspctionId;
                  this.itemDate.forEach(element => {
                    element.rfi_id = this.inspectionIDs.inspection_id ,
                    element.approved_qty = 0
                    this.services.createItemRFI(element).subscribe(
                      data=>{
                         //function for calling Stackbar
                        let msg = this.openSnackBar("تم الإضافة بنجاح" , "إالغاء" );
                        if(msg)
                        {
                        this.services.UploadFile(this.filename , this.base64 , this.inspectionIDs.inspection_id).subscribe(
                          data=>console.log(data) , 
                          err=> console.log(err)
                        );
                         // location.reload();
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
