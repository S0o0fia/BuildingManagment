import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'ms-exracts',
  templateUrl: './exracts.component.html',
  styleUrls: ['./exracts.component.scss']
})
export class ExractsComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: ''});
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  constructor(private router : Router) { }
    

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
      
    }
   

  open()
  {
    this.router.navigate(['/home/addextract']);

  }
}
