import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/Service/core/core.service';
import { ConsualtantQTComponent } from '../consualtant-qt/consualtant-qt.component';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Consultantqty } from 'app/Models/Consqty/consultantqty';

@Component({
  selector: 'ms-addconsualtant-qt',
  templateUrl: './addconsualtant-qt.component.html',
  styleUrls: ['./addconsualtant-qt.component.scss']
})
export class AddconsualtantQTComponent implements OnInit {

  //binding request
  specialization : any []=[];
  qualification : any [] = [];
  //binding 
  special : number;
  qualify  : number;
  mduration : number;
  qty : number =null;
  unit_price : number;
  total_price : number;
  description  :string;
  contract_id : number;
  newConsultantQty : Consultantqty;
  constructor(public service : CoreService ,   public dialogRef: MatDialogRef<ConsualtantQTComponent> , 
    private _snackBar: MatSnackBar) {
    dialogRef.disableClose = true;
    this.contract_id = +localStorage.getItem('contract_id');

   }

  ngOnInit() {

    this.service.getSpeclization().subscribe(
      data=> this.specialization = data as any [] ,
      err=> console.log(err)
    )

    this.service.getQualifications().subscribe(
      data => this.qualification = data as any , 
      err => console.log(err)
    )
  }


  //to calculater the total price of qty 
  calTotal()
  {
     this.total_price = this.qty * this.unit_price;
  }

  Save()
  {

    this.newConsultantQty ={
    
      contract_id : this.contract_id , 
     description : this.description , 
     duartion : this.mduration , 
     price : this.unit_price , 
     price_total : this.total_price , 
     qty : this.qty , 
     qualification_id :+this.qualify, 
     specialty_id : +this.special,
    }
  
    this.service.createConsultantqty(this.newConsultantQty).subscribe(
      data=>{        
        console.log(data);
        this._snackBar.open('تمت الإضافة بنجاح', 'إلغاء');
       location.reload();
        
      },
      err=>console.log(err)
      
      )
  }
}
