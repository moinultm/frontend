export class Client {
    id: number;
    full_name:string;
    client_code:string;
    contact:number;
    company_name:string;
    email:string;
    address:string;
    client_type:string;
    previous_due:number;
    account_no:number;

    net_total:number;
    total_due: number;
    total_invoice: number;
    total_received: number;
    total_return:number;

    client:[];
    payments:[];
    returns:[];
    payment_lists:[];
}
