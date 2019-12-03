import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'ms-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	constructor(public router : Router) { }

	ngOnInit() {		
	}

	onClick(){
		var first = location.pathname.split('/')[1];
		if(first == 'home'){
			this.router.navigate(['/home/crm']);
		}else {
			this.router.navigate(['/home/crm']);
		}
	}

}
