import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'ms-chooserequest',
  templateUrl: './chooserequest.component.html',
  styleUrls: ['./chooserequest.component.scss']
})
export class ChooserequestComponent implements OnInit {

  constructor(private router : Router , public dialog : MatDialog) { }
  dropList = [
    "Request for Inspection",
    "Material Perview Request" ,
    "Sketch Request",
    "Test Request",
    "Time Program",
    "Working Mechanism",
    "Queries",
    "Quality Plan",
    "Safety and Security Plan",
    "Adopt inventory of quantities",
    "Receive reports",
    "Approval of a subcontractor or supplier",
    "Request for Recieves Items",
    "Permission for concrete casting",
    "Permission to start a business",
     ];
  ngOnInit() {
  }


  Choose(list )
  {

    switch(list)
    {
     case  "Request for Inspection":
      {
        this.router.navigate(['/home/table/rfi']);
       this.dialog.closeAll();
        
      }
      break;
     case "Material Perview Request" :
       {
         this.router.navigate(['/home/under']);
         this.dialog.closeAll();
       }
       break;

    case  "Sketch Request":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case  "Test Request":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case  "Time Program":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
    break;

    case  "Working Mechanism":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case "Queries":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case  "Quality Plan":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case "Safety and Security Plan" : 
    {
      this.router.navigate(['/home/under']);
      this.dialog.closeAll();
    }
    break;

    case "Adopt inventory of quantities":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case "Receive reports":
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case "Approval of a subcontractor or supplier" :
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
    
      }
      break;

    case "Request for Recieves Items" :
      {
        this.router.navigate(['/home/table/receiveitem']);
        this.dialog.closeAll();
      }
      break;

    case "Permission for concrete casting" :
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;

    case "Permission to start a business" :
      {
        this.router.navigate(['/home/under']);
        this.dialog.closeAll();
      }
      break;
    }
  }
}
