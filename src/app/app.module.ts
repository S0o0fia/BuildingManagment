import { NgModule, CUSTOM_ELEMENTS_SCHEMA , Pipe , PipeTransform} from '@angular/core';
import 'hammerjs';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MatSlideToggleModule,MatButtonModule, MatBadgeModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
			MatTableModule, MatExpansionModule, MatSelectModule, MatSnackBarModule, MatTooltipModule, MatChipsModule, MatListModule, MatSidenavModule,  
			MatTabsModule,  MatProgressBarModule,MatCheckboxModule, MatSliderModule,MatRadioModule,MatDialogModule,MatGridListModule, MatDividerModule, MatFormFieldModule
} from '@angular/material';
import { RoutingModule } from "./app-routing.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HijriService, HijriModule } from 'ngx-hijri-lib';
import { MenuToggleModule } from './Components/core/menu/menu-toggle.module';

import { GeneAppComponent } from './app.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainComponent } from './Components/main/main.component';
import { CrmComponent } from './Components/crm/crm.component';
import { CreatprojectComponent } from './Components/creatproject/creatproject.component';
import { QuantitytableComponent } from './Components/quantitytable/quantitytable.component';
import { LoginComponent } from './Components/login/login.component';
import { MenuItems } from './Components/core/menu/menu-items/menu-items';
import { PageTitleService } from './Components/core/page-title/page-title.service';
import { AuthGuard } from './Components/core/guards/auth.guard';
import { StatsCardComponent } from './Components/stats-card/stats-card.component';
import { TickerSliderComponent } from './Components/ticker-slider/ticker-slider.component';
import { nvD3 } from './Components/core/nvD3/nvD3.component';
import { CreatequantityComponent } from './Components/createquantity/createquantity.component';
import { RequestForInspectionComponent } from './Components/request-for-inspection/request-for-inspection.component';
import { AddRequestComponent } from './Components/add-request/add-request.component';

import { ActivestageComponent } from './Components/activestage/activestage.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { D3ChartService } from './Components/core/nvD3/nvD3.service';

import { AttendeceComponent } from './Components/attendece/attendece.component';
import { AddAttendeceComponent } from './Components/add-attendece/add-attendece.component';
import { ProjectdetailsComponent } from './Components/projectdetails/projectdetails.component';
import { RFIStatusComponent } from './Components/rfistatus/rfistatus.component';
import { ExtractsComponent } from './Components/extracts/extracts.component';
import { FullWidthGraphComponent } from './Components/full-width-graph/full-width-graph.component';
import { ChartsModule } from 'ng2-charts';


import { AgmCoreModule } from '@agm/core';
import { VgCoreModule} from 'videogular2/core';
import { VgControlsModule} from 'videogular2/controls';
import { VgOverlayPlayModule} from 'videogular2/overlay-play';
import { VgBufferingModule} from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';
import { VideosComponent } from './Components/videos/videos.component';
import { EditProjectComponent } from './Components/edit-project/edit-project.component';
import { FileManagementComponent } from './Components/file-management/file-management.component';
import { RquestforRecieveItemsComponent } from './Components/rquestfor-recieve-items/rquestfor-recieve-items.component';
import { AddrecieveditemComponent } from './Components/addrecieveditem/addrecieveditem.component';
import { ExractsComponent } from './Components/exracts/exracts.component';
import { AddExtractComponent } from './Components/add-extract/add-extract.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { AddDiscountComponent } from './Components/add-discount/add-discount.component';
import { ProjectsmapComponent } from './Components/projectsmap/projectsmap.component';
import { ExcelService } from './Service/excel.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddBuildingComponent } from './Components/add-building/add-building.component';
import { RfidetailsComponent } from './Components/rfidetails/rfidetails.component';
import { EditContractedQunatityComponent } from './Components/edit-contracted-qunatity/edit-contracted-qunatity.component';
import { SelectApproveComponent } from './Components/select-approve/select-approve.component';
import { ProjectitemsComponent } from './Components/projectitems/projectitems.component';
import { ChooserequestComponent } from './Components/chooserequest/chooserequest.component';
import { UnderdevelopmentComponent } from './Components/underdevelopment/underdevelopment.component';
import { DiscountComponent } from './Components/discount/discount.component';
import { MirapproveComponent } from './Components/mirapprove/mirapprove.component';
import { ApproveQuantitiesComponent } from './Components/approve-quantities/approve-quantities.component';
import { NumberFormatPipe } from './Models/Pipe/number.pip';
import { CollectTableComponent } from './Components/collect-table/collect-table.component';
import { CountdetailsComponent } from './Components/countdetails/countdetails.component';
import { CountitemdetailsComponent } from './Components/countitemdetails/countitemdetails.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ExtractdetailsComponent } from './Components/extractdetails/extractdetails.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UserslistComponent } from './Components/userslist/userslist.component';
import { CreateuserComponent } from './Components/createuser/createuser.component';
<<<<<<< HEAD
import { RoleManagementComponent } from './Components/role-management/role-management.component';
import { ModifyroleComponent } from './Components/modifyrole/modifyrole.component';
=======
import { ConsualtantQTComponent } from './Components/consualtant-qt/consualtant-qt.component';
import { AddconsualtantQTComponent } from './Components/addconsualtant-qt/addconsualtant-qt.component';
import { ContractstableComponent } from './Components/contractstable/contractstable.component';
import { AddConsultantContractComponent } from './Components/add-consultant-contract/add-consultant-contract.component';
>>>>>>> 1d6b9bb0dac215f0e04619364932dc97c239c542

export const firebaseConfig = {
	apiKey: "AIzaSyCE0po6Q8jGuBEds-A903KEU4U6Cerojzo",
	authDomain: "gene-eaeef.firebaseapp.com",
	databaseURL: "https://gene-eaeef.firebaseio.com",
	projectId: "gene-eaeef",
	storageBucket: "gene-eaeef.appspot.com",
	messagingSenderId: "81833823583",
	appId: "1:81833823583:web:581d7ddd8cfa93a4"
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		NgxPaginationModule,
		NgbDatepickerModule.forRoot() ,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyARLJcKPev4Ot6baTkjNKjczRDHYlFhgzo'
		  }),
		BrowserAnimationsModule, 
		FileUploadModule ,
		FormsModule,
		FileUploadModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		RoutingModule,
		MatDatepickerModule,
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		Ng5BreadcrumbModule.forRoot(),
		TourMatMenuModule.forRoot(),
		PerfectScrollbarModule,
		MenuToggleModule,
		FileUploadModule,
	    HttpClientModule,
	    ChartsModule,
	    HijriModule,
		VgCoreModule,
		VgControlsModule,
		VgOverlayPlayModule,
		VgBufferingModule,
		VgStreamingModule,
        HttpClientModule,

      MatSlideToggleModule,
		TranslateModule.forRoot({
         loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
         }
      }),
		AngularFireModule.initializeApp(firebaseConfig),
    	AngularFireAuthModule,
		MatButtonModule, 
		MatCardModule, 
		MatMenuModule, 
		MatToolbarModule, 
		MatIconModule, 
		MatBadgeModule,
		MatInputModule, 
		MatDatepickerModule, 
		MatNativeDateModule, 
		MatProgressSpinnerModule,
		MatTableModule, 
		MatExpansionModule, 
		MatSelectModule, 
		MatSnackBarModule, 
		MatTooltipModule, 
		MatChipsModule, 
		MatListModule, 
		MatSidenavModule, 
		MatTabsModule, 
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		ToastrModule.forRoot(),
		
		LoadingBarRouterModule,
		LoadingBarRouterModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		FormsModule,
	    
		RoutingModule,
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		Ng5BreadcrumbModule.forRoot(),
		TourMatMenuModule.forRoot(),
		PerfectScrollbarModule,
		MenuToggleModule,
         HttpClientModule,
         MatSlideToggleModule,
		TranslateModule.forRoot({
         loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
         }
      }),
		AngularFireModule.initializeApp(firebaseConfig),
    	AngularFireAuthModule,
		MatButtonModule, 
		MatCardModule, 
		MatMenuModule, 
		MatToolbarModule, 
		MatIconModule, 
		MatBadgeModule,
		MatInputModule, 
		MatDatepickerModule, 
		MatNativeDateModule, 
		MatProgressSpinnerModule,
		MatTableModule, 
		MatExpansionModule, 
		MatSelectModule, 
		MatSnackBarModule, 
		MatTooltipModule, 
		MatChipsModule, 
		MatListModule, 
		MatSidenavModule, 
		MatTabsModule, 
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		ToastrModule.forRoot(),
		
		LoadingBarRouterModule,
		LoadingBarRouterModule,
		RouterModule,
	
		CommonModule,
		MatCardModule,
		FlexLayoutModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatExpansionModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatMenuModule,
		MatDividerModule,
		FormsModule,
		
		ReactiveFormsModule,
	    MatSnackBarModule,
		SlickCarouselModule,
		TranslateModule,
		MatChipsModule,
		MatListModule,
	    PerfectScrollbarModule,
		MatTableModule
	],
	declarations: [
		GeneAppComponent, 
		NumberFormatPipe,
	    SideBarComponent, FooterComponent ,
		MainComponent,
		CrmComponent , 
		
		CreatprojectComponent , 
		QuantitytableComponent,
		LoginComponent,
		StatsCardComponent,
		TickerSliderComponent,
		nvD3,
		CreatequantityComponent,
		RequestForInspectionComponent,
		AddRequestComponent,
		ActivestageComponent,
		PieChartComponent,		
		AttendeceComponent,
		AddAttendeceComponent,
		ProjectdetailsComponent,
		RFIStatusComponent,
		ExtractsComponent,
		FullWidthGraphComponent,
		VideosComponent,
		EditProjectComponent,
		FileManagementComponent,
		
		RquestforRecieveItemsComponent,
		AddrecieveditemComponent,
		ExractsComponent,
		AddExtractComponent,
		AddItemComponent,
		AddDiscountComponent ,
		ProjectsmapComponent,
		AddBuildingComponent,
		RfidetailsComponent,
		EditContractedQunatityComponent,
		SelectApproveComponent,
		ProjectitemsComponent,
		ChooserequestComponent,
		UnderdevelopmentComponent,
		DiscountComponent,
		MirapproveComponent,
		ApproveQuantitiesComponent,
		CollectTableComponent,
		CountdetailsComponent,
		CountitemdetailsComponent,
		ExtractdetailsComponent,
		UserslistComponent,
		CreateuserComponent,
<<<<<<< HEAD
		RoleManagementComponent,
		ModifyroleComponent
=======
		ConsualtantQTComponent,
		AddconsualtantQTComponent,
		ContractstableComponent,
		AddConsultantContractComponent
>>>>>>> 1d6b9bb0dac215f0e04619364932dc97c239c542

	
		
		
	],
	entryComponents:[
		AddConsultantContractComponent , 
		AddconsualtantQTComponent,
		DiscountComponent,
		CreateuserComponent,	
		ChooserequestComponent,
		UnderdevelopmentComponent,
		EditContractedQunatityComponent,
		SelectApproveComponent,
		CreatequantityComponent,
		AddRequestComponent,
		PieChartComponent,
		AddAttendeceComponent,
		AddrecieveditemComponent,
		ProjectdetailsComponent,
		RFIStatusComponent,
		ExtractsComponent,
		AddItemComponent,
		AddDiscountComponent,
		AddBuildingComponent
		
	],
	exports:[
		MatDatepickerModule ,
	
		
		]
	,
	bootstrap: [GeneAppComponent],
	providers: [
		CurrencyPipe,
		MenuItems,
		BreadcrumbService,
		PageTitleService,
		HijriService,
		ExcelService,
		NumberFormatPipe,
		D3ChartService,

	
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		AuthGuard
	],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneAppModule { }
