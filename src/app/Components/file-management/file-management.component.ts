import { CoreService } from 'app/Service/core/core.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

interface FoodNode {
  name: string;
  id:number;
  children?: FoodNode[];
  level:any;
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'ms-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {
  attachments: any[]=[];
  url: Object;
  downloadUrl: string;
  base64:any;
  BASE64_MARKER: string = ';base64,';
  filename: any;

  ngOnInit() {
    this.service.getFiles().subscribe(
      data=> {
        this.attachments = data as any[];
        //this.dataSource.data=this.attachments;
        const TREE_DATA: any[] = [
          {
            name: localStorage.getItem("projectname"),
            children:this.attachments
          }
        ];
        this.dataSource.data = TREE_DATA;
        this.downloadUrl = this.service.returnBase+"/attachment/get?db=nqproject&token="+localStorage.getItem('token')+"&attach_id=";
      }, 
      err => console.log(err)          
     );
  }
  

  onSelectFiles(evt) {
    let me = this;
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.base64 = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
     this.filename = evt.target.files[0].name;
  }

  upload(){
    this.service.UploadFile2(this.filename , this.base64 , Number(localStorage.getItem("projectid"))).subscribe(
      data=>
      {
        console.log(data);
        this.ngOnInit();
      },
      
      err=> console.log(err)
    );
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id:node.id,
      level: level,
    };
  }

  // private _getLevel = (node: FoodNode) => { return node.level; };

  // private _isExpandable = (node: FoodNode) => { return node.expandable; };

  // private _getChildren = (node: FoodNode): Observable<FoodNode[]> => {
  //   return observableOf(node.children);
  // }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service : CoreService) {
    // this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  @ViewChild('tree',null) tree;

  ngAfterViewInit() {
    this.tree.treeControl.expandAll();
  }

  download(id){
    this.service.getAttachment(id).subscribe(
      data=> this.url=data, 
      err => console.log(err)
     );
  }
  
}

