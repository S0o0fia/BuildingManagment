import { ChildrenItems } from './children-items';

export interface Menu {
    state: string;
	name: string;
	type: string;
	icon: string;
	children?: ChildrenItems[];
}
