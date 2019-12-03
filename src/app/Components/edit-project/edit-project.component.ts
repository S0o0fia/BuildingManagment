import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';

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
  project : any;
  projectid : any;
  constructor(private sevices: CoreService) { 
    this.minDate = new Date(1900,1,1);
    this.maxDate = new Date(2050,1,1);
    this.projectid = localStorage.getItem('prijectId');

      }

  ngOnInit() {
    this.sevices.getStuats().subscribe(
      res=> this.data = res as string[],
      err=> console.log(err)
    );

    this.sevices.getProjectList().subscribe(
      data=> this.project = data , 
      err => console.log(err)
    );
    
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


