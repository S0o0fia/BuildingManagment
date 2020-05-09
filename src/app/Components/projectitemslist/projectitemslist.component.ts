import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { RequestForInspectionComponent } from '../request-for-inspection/request-for-inspection.component';
import { Rfi } from 'app/Models/RFI/rfi';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'app/Service/core/core.service';
import { ProjectitemsComponent } from '../projectitems/projectitems.component';

@Component({
  selector: 'ms-projectitemslist',
  templateUrl: './projectitemslist.component.html',
  styleUrls: ['./projectitemslist.component.scss']
})
export class ProjectitemslistComponent implements OnInit {
  itemslist: any[]=[];

  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar
    ,private translate : TranslateService , private  services :CoreService) { }

  ngOnInit() {
    this.services.getProjectitem().subscribe(
      data=> this.itemslist = data as any[], 
      err=> console.log(err)
    );
  }


  openDialog()
  {
    const dialogRef = this.dialog.open(ProjectitemsComponent, {
      width: '80%',
      height: '85%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
