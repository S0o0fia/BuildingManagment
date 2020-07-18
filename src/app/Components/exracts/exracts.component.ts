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
  statename : string = "draft" ;
  public rowSelected : any = -1;
  activity : any[]=[];
  camcreate : boolean = false; 

  constructor(private router : Router , public service : CoreService) {
    this.projectname = localStorage.getItem('projectname');
    this.role = +localStorage.getItem('Role');
   }
    
   ngOnInit() {
    this.service.getInvoice().subscribe(
      data=> {this.Invoices = data as any , 
      console.log(data)} ,
      err=> console.log(err));  
    
     this.totalRec = this.Invoices.length;
    
     this.service.getRole(this.role).subscribe(
      data=>{
        this.activity = data[0].activity_ids;
        this.activity.forEach(element => {
          if(element.name == "create inv")
          {
            this.camcreate = true;
          } 
        });
      }
    )
   

    

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

state(key:string)
{
 this.statename = key;
  // if(key=='draft'){
  //   let draft=this.counttable.filter(x=>x.state=='draft');
  //   this.totalRec = draft.length;
  // }
  // if(key=='waiting'){
  //   let waiting=this.counttable.filter(x=>x.state=='waiting');
  //   this.totalRec = waiting.length;
  // }
  // if(key=='accepted'){
  //   let accepted=this.counttable.filter(x=>x.state=='accepted');
  //   this.totalRec = accepted.length;
  // }
}
}
