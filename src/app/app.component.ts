import {Component, Optional, ViewEncapsulation, Inject} from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
   Router,
   // import as RouterEvent to avoid confusion with the DOM Event
   Event as RouterEvent,
   NavigationStart,
   NavigationEnd,
   NavigationCancel,
   NavigationError
 } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  	selector: 'gene-app',
    templateUrl: 'app.component.html',
   encapsulation: ViewEncapsulation.None,
  providers : [NgxSpinnerService]
})

export class GeneAppComponent {
   loading = true
   constructor(translate: TranslateService , @Inject(NgxSpinnerService) private spinner: NgxSpinnerService ,private http: HttpClient,
   private router: Router) {
      translate.addLangs(['en', 'fr', 'he', 'ru' , 'ar' , 'zh' ,'de' , 'es', 'ja', 'ko' , 'it' ,'hu']);
      translate.setDefaultLang('ar');

      const browserLang: string = translate.getBrowserLang();
      translate.use(browserLang.match(/ar/) ? browserLang : 'ar');

      this.router.events.subscribe((event) => {
        
         switch (true) {
             case event instanceof NavigationStart: {
                 this.loading = true;
                 console.log(this.loading);
                 break;
             }
             case event instanceof NavigationEnd:
             case event instanceof NavigationError:
             case event instanceof NavigationCancel: {
                 this.loading = false;
                 console.log(this.loading);
                 break;
             }
             default: {
                 break;
             }
         }
     });
   
   }
   ngOnInit() {
      /** spinner starts on init */
      this.spinner.show();
   
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);

      
    }

   
 }
