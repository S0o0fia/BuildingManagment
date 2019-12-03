import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';

@Component({
  selector: 'ms-projectsmap',
  templateUrl: './projectsmap.component.html',
  styleUrls: ['./projectsmap.component.scss']
})
export class ProjectsmapComponent implements OnInit {
  lng : number;
  lat:number;
  ProjectList:any=[];
  

  // placeMarker(position: any) {
  //   const lat = position.coords.lat;
  //   const lng = position.coords.lng;
  // }
    // longitude = 20.728218;
    // latitude = 52.128973;

    markers = [];
  
    getLocations(){
      this.service.getProjectList().
      subscribe( res =>
            {
            this.ProjectList = res;
            if(this.ProjectList.length>0){              
              this.placeMarkers();
            }
            },                     
              err => console.log(err)
      );
    }

  constructor(public service : CoreService ,  private pageTitleService: PageTitleService) { 
    
  }

  ngOnInit() {
    this.getLocations();
    this.pageTitleService.setTitle('خريطة المواقع');
  }

placeMarkers(){  
  for(var i=0; i<this.ProjectList.length; i++){
    if(this.ProjectList[i].latitude!=""){
      this.markers.push({ latitude: this.ProjectList[i].latitude, longitude: this.ProjectList[i].longitude, project: this.ProjectList[i].name });
    }
  }
}

}
