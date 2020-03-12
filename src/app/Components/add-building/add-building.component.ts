import { Component, OnInit, Inject } from '@angular/core';
import { CreatprojectComponent } from '../creatproject/creatproject.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ms-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {
   
  buildinglocation : FormControl;
  buildingType : FormControl; 
  Municipal: FormControl;
  Neighborhood: FormControl;
  uploader: FileUploader = new FileUploader({url: ''});
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  bLocation : string;
  btype : string;
  municiple : string;
  neightborhood : string;
  filename : string;
  data : any[];
  projectname : string;
    

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

  addtotable()
  {
    this.bLocation = this.buildinglocation.value,
    this.btype = this.buildingType.value,
    this.municiple = this.Municipal.value,
    this.neightborhood = this.Neighborhood.value,
    this.filename = this.uploader.queue.values.name,
     this.data.push({
        location : this.bLocation,
        type : this.btype , 
        municiple : this.municiple , 
        neightborhood : this.neightborhood ,
        filename : this.filename
     })

  }
   
 
  constructor(   public dialogRef: MatDialogRef<CreatprojectComponent>,private router : Router,
    @Inject(MAT_DIALOG_DATA) private translate : TranslateService , private formBuilder: FormBuilder) {

    this.buildingType = new FormControl('' , Validators.required);
    this.buildinglocation =  new FormControl('' , Validators.required);
    this.Municipal =  new FormControl('' , Validators.required);
    this.Neighborhood =  new FormControl('' , Validators.required);
    
    this.projectname = localStorage.getItem('projectname');
    dialogRef.disableClose = true;
   
    }
  	
   

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  
  ngOnInit() {
    
  }  
}
