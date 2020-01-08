import { SellsInvoice } from './invoice.model';

export class Product {
    id:number;
    name:string;
    code:number;
    category_id:number;
    subcategory_id:number;
    quantity:number;
    general_quantity:number;
    details:number;
    cost_price:number;
    mrp:number;
    tax_id:number;
    minimum_retail_price:number;
    unit:string;
    status:number;
    image:any;
    opening_stock:number;

    sells:Array<SellsInvoice>;

    data:[]



   // purchases:[];

}
