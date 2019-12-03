import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ms-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {
  // ng g
    hasBaseDropZoneOver = false;
    hasAnotherDropZoneOver = false;

    constructor( private pageTitleService: PageTitleService,
                 private translate : TranslateService) {}

    ngOnInit() {
        this.pageTitleService.setTitle("Upload");
    }

    
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
}

