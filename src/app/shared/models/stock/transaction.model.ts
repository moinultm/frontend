import { SellsInvoice } from './invoice.model';

export class Transaction {
    change_amount:  number;
    client_id: number;
    client_name: string;
    discount: number;
    id: number;
    invoice_tax: number;
    labor_cost: number;
    net_total: number;
    paid: number;
    pos: number;
    reference_no: number;
    return: number;
    sells:Array<SellsInvoice>;
    total: number;
    total_cost_price:number;
    total_paid: number;
    total_pay: number;
    total_return: number;
    total_tax: number;
    transaction_type: string;
    warehouse_id: number;

}
