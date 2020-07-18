import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/Service/core/core.service';
import { MatSnackBar } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ms-extractdetails',
  templateUrl: './extractdetails.component.html',
  styleUrls: ['./extractdetails.component.scss'] , 
  animations:[ trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('700ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
    ]),
    
    transition(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ])
],
})
export class ExtractdetailsComponent implements OnInit {
  
  Invoices:any[]=[];
  Discount : any[]=[];
  Items : any[] = [];
  projectname : string;
  totalRec : number;
  page: number = 1;
  public rowSelected : any = -1;
  id :number;
  state : string;
  boolconsultant : boolean = false;
  invoice : any;
  role : number;
  activity : any[]=[];
  submitinv : boolean= false;
  approveinv : boolean=false;
  rejectinv :boolean=false;
  payinv : boolean = false;
  constructor(private route:ActivatedRoute  , private router : Router , public service : CoreService , 
    public openSnackBar : MatSnackBar) {
    this.projectname = localStorage.getItem('projectname');
    this.id = +( this.route.snapshot.paramMap.get('id') );
    this.role = +localStorage.getItem('Role');
   }

   paid()
   {
     this.service.setStateInvoice(this.id , 'paid').subscribe(
       data=>{
        let msg = this.openSnackBar.open('تم دفع المستخلص', 'إلغاء');
        if(msg)
        {
        location.reload();
        }
       }, 
       err=>console.log(err)
     )
   }

   ApproveDraft()
   {
      this.service.setStateInvoice(this.id , 'waiting').subscribe(
      data=>{
        this.state='waiting';
        let msg = this.openSnackBar.open('تم اعتماد المسودة', 'إلغاء');
        if(msg)
        {
        location.reload();
        }
   
      }, 
      err=>console.log(err)
    )
   }

   Approve()
   {
      this.service.setStateInvoice(this.id , 'accepted').subscribe(
      data=>{
        this.state='accepted';
        let msg = this.openSnackBar.open('تم اعتماد المستخلص', 'إلغاء');
        if(msg)
        {
        location.reload();
        }
   
      }, 
      err=>console.log(err)
    )
   }


   Rejected()
   {
      this.service.setStateInvoice(this.id , 'rejected').subscribe(
      data=>{
        this.state='rejected';
        let msg = this.openSnackBar.open('تم رفض المستخلص', 'إلغاء');
        if(msg)
        {
        location.reload();
        }
   
      }, 
      err=>console.log(err)
    )
   }
   
  ngOnInit() {
    
    this.service.getInvoice().subscribe(
      data=> {this.Invoices = data as any[]
        this.Invoices.forEach(e=>{
          if(e.id == this.id)
          {
           this.state = e["state"];
          }
        })
      }, 
      err => console.log(err)
    )
    
    this.service.getInvoiceitems(this.id).subscribe(
      data=>{
        this.Items = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );


    this.service.getInvoicediscount(this.id).subscribe(
      data=>{
        this.Discount = data as any[] ;
        console.log(this.Items);
      },
      err=>console.log(err)
    );

    this.service.getRole(this.role).subscribe(
      data=>{
        this.activity = data[0].activity_ids;
        this.activity.forEach(element => {
          if(element.name == "submit inv")
          {
            this.submitinv = true;
          }
          if(element.name == "approve inv")
          {
            this.approveinv = true;
          }
          if(element.name == "reject inv")
          {
            this.rejectinv = true;
          }
          if(element.name == "pay inv")
          {
            this.payinv = true;
          }
        });
      }
    )
  }

  back()
  {
    this.router.navigate(['/home/abstracts']);
  }

  

}
