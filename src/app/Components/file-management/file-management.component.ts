import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource } from '@angular/material';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf } from 'rxjs';
import { CoreService } from 'app/Service/core/core.service';

/** File node data with nested structure. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'ms-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  files:any[]=[];
  treeControl = new NestedTreeControl<any>(node => node.children);
  // ng g
    hasBaseDropZoneOver = false;
    hasAnotherDropZoneOver = false;
  hierarchy: any;

    constructor( private pageTitleService: PageTitleService,
                 private translate : TranslateService, private services : CoreService) {
                  
                 }

    ngOnInit() {
        this.pageTitleService.setTitle("Upload");
        this.services.getFiles().subscribe(
          data=>{
            this.files = data as any[] ;
            console.log(this.files);
    
          },
         err=>console.log(err)
        );
    }

    //On View Hierarchy
    onHierarchyClick() {
      this.services.getFiles().subscribe((Data) => {
        if (Data) {
          this.hierarchy = Data;
          this.unflatten(this.hierarchy);
          // this.tree.treeControl.expandAll();
          this.tree.treeControl.expandAll();
        }
        else {
          console.log("An error has occured");
        }
      }, (error) => {
        console.log("An error has occured");
      })
    }

    unflatten(arr) {
      var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;
      for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
      }
      for (var Id in mappedArr) {
        if (mappedArr.hasOwnProperty(Id)) {
          mappedElem = mappedArr[Id];
          if (mappedElem.parent_id) {
            if (mappedArr[mappedElem['parent_id']]['children'] != undefined) {
              mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            }
          }
          else {
            tree.push(mappedElem);
          }
        }
      }
      this.files = tree;
      this.treeControl.dataNodes = this.files;
    }
    hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
    @ViewChild('tree',null) tree;
    
}

