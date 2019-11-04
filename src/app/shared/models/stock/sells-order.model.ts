import { OrderItems } from './order-items.model ';


export class SellsOrder {

    id: number;
    reference_no: string;
    client_id:number;
    product_id:number;
    warehouse_id:number;
    quantity:number;
    unit_cost_price:number;
    discount:number;
    sub_total:number;
    product_tax:number;
    product_name:string;
    mrp:number;

    total:number;
    net_total:number;

}
