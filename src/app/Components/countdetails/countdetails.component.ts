import { Component, OnInit } from '@angular/core';
import { CollectTableComponent } from '../collect-table/collect-table.component';
import { GetRFI } from 'app/Models/RFI/get-rfi';
import { NewItemRFI } from 'app/Models/Items/new-item-rfi';
import { CoreService } from 'app/Service/core/core.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-countdetails',
  templateUrl: './countdetails.component.html',
  styleUrls: ['./countdetails.component.scss'] ,
  animations:[
   
    trigger('tabletoggle' , [
      transition(':enter', [
        style({ opacity: 0 }), animate('1000ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('1000ms', style({ opacity: 0 }))]
      )
    ]) 
    
  ] 
})
export class CountdetailsComponent implements OnInit {

  boolrole : boolean = false ; 
  role : number;
 
  counttable : any[] = [];
  
  resultsLength = 0;
  totalRec : number;
  page: number = 1;
  statename : string;
  projectname : string;
  public rowSelected : any = -1;
  activity : any[]=[];
  camcreate : boolean= false;
  constructor(public service : CoreService,
    private pageTitleService: PageTitleService ,private router:Router, private dialog: MatDialog) { 

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.projectname = localStorage.getItem('projectname');
      this.statename = "draft";
      this.role = +localStorage.getItem('Role');

    }

    countdetails(id)
    {
      
     this.router.navigate(['home/table/countitemdetails',id]);
      
    }
ngOnInit() {
  
  this.service.getRole(this.role).subscribe(
    data=>{
      this.activity = data[0].activity_ids;
      this.activity.forEach(element => {
        if(element.name == "create qsr")
        {
          this.camcreate = true;
        }
       
      });
    }
  )

this.pageTitleService.setTitle('قائمة طلبات الحصر ' +' / '+this.projectname);

 this.service.getCount().subscribe(
   data=> {
    this.counttable = data as any[];    
    let draft=data.filter(x=>x.state=='draft');
    this.totalRec = draft.length;
  },
   err=> console.log(err)
 );



}

openCloseRow(id): void {
  this.rowSelected = this.rowSelected == -1 ? id : -1;
  console.log(this.rowSelected);
  }

openDialog(): void {
  const dialogRef = this.dialog.open( CollectTableComponent, {
    width: '80%',
    height: '85%'
   
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
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

