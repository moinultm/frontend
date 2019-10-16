import { OrderItems } from './order-items.model ';


export class SellsInvoice {
    id: number;
    reference_no: string;
    order_no:string;
    client_id:number;
    user_id:number;
    product_id:number;
    warehouse_id:number;
    quantity:number;
    unit_cost_price:number;
    product_discount_percentage:number;
    product_discount_amount:number
    sub_total:number;
    product_tax:number;
    product_name:string;
    mrp:number;
    net_total:number;
    discount:number;
    
}
