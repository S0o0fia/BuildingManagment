import { NewItemRFI } from '../Items/new-item-rfi';

export interface Rfi {
      id:number;
      request_name : string;
      request_ids:number;
      request_num: string;
      work_location: string; 
      start_date : string;
      end_date : string;
      inspect_date : string;
      item_id : number;
      pitem : string;
   
}
