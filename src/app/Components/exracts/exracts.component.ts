import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { CoreService } from 'app/Service/core/core.service';



@Component({
  selector: 'ms-exracts',
  templateUrl: './exracts.component.html',
  styleUrls: ['./exracts.component.scss']
})
export class ExractsComponent implements OnInit {
  boolrole : boolean = false ;
  role : number;
  uploader: FileUploader = new FileUploader({url: ''});
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  Invoices:any[]=[];
  projectname : string;
  totalRec : number;
  page: number = 1;
  public rowSelected : any = -1;
  constructor(private router : Router , public service : CoreService) {
    this.projectname = localStorage.getItem('projectname');
    this.role = +localStorage.getItem('Role');
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
    ngOnInit() {
      this.service.getInvoice().subscribe(
        data=> this.Invoices = data as any ,
        err=> console.log(err));  
      
       this.totalRec = this.Invoices.length;


    if(this.role == 2)
    {
      this.boolrole = true;
    }

  }
   
  invoicedetails(id)
  {
    this.router.navigate(['home/abstractsdetials',id]);
  }
  open()
  {
    this.router.navigate(['/home/addextract']);

  }

  openCloseRow(id): void {
    this.rowSelected = this.rowSelected == -1 ? id : -1;
    console.log(this.rowSelected);
    }
}
