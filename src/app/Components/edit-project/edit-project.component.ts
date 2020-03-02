import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ms-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  minDate:Date;
  maxDate :Date;
  data : string[];
  selectedIndex: number = 0;
  project : any=[];
  projectid : any;
  exType : number=0;
  myForm: FormGroup;
  arr: FormArray;
  uploader: FileUploader = new FileUploader({url: ''});
  extension_time_days : number = 0;
  extension_time_month : number =0;
  extension_time_date: Date = new Date();
  constructor(private sevices: CoreService , private fb: FormBuilder ) { 
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
    this.projectid = localStorage.getItem('prijectId');

      }
 
  createItem() {
    return this.fb.group({
      extension_time_days: [ {value : '' } ],
      extension_time_month: [{value : '' }],
      extension_time_date : [{value : '' }]
    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }
  extentype(val)
  {
    
    
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  ngOnInit() {
    this.sevices.getStuats().subscribe(
      res=> this.data = res as string[],
      err=> console.log(err)
    );

    this.sevices.getProject().subscribe(
      data=> {this.project = data ;
      console.log(this.project)}, 
      err => console.log(err)
    );
    this.myForm = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
    
  
  }

  nextStep() {
    
    this.selectedIndex += 1;
 }

 previousStep() {
  
  
    this.selectedIndex -= 1;
 }
   
 SaveData()
 {
    
 }
}

 

 



