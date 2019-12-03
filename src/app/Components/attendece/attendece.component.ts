import { Component, OnInit } from '@angular/core';
import { AddAttendeceComponent } from '../add-attendece/add-attendece.component';
import { PageTitleService } from '../core/page-title/page-title.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'ms-attendece',
  templateUrl: './attendece.component.html',
  styleUrls: ['./attendece.component.scss']
})
export class AttendeceComponent implements OnInit {

  constructor( private pageTitleService: PageTitleService , private dialog: MatDialog) { 

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

 

  }

 
ngOnInit() {
this.pageTitleService.setTitle("الحضور والانصراف");

}

openDialog(): void {
const dialogRef = this.dialog.open(AddAttendeceComponent, {
  width: '80%',
  height: '85%'
 
});

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  
});
}
}