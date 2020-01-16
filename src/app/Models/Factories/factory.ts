import { Matetrial } from '../Material/matetrial';

export interface Factory {
    facroty_id: number;
    name : string ; 
    materials :Matetrial[];
}
