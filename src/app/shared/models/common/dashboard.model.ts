export class   Dashboard  {

    todays_stats:any[]
   top_product_name:any[]
    selling_quantity:any[]
    stock:any[]
    months:[]
    sells:[]
    purchases:[]
    last_six_months_profit:[]
    lastSevenDaySells:[]
    lastSevenDayPurchases:[]
    lastSevenDayTransactions:[]
   daynames:[]
}



export interface todays_stats {
  total_selling_quantity: number;
  total_purchasing_quantity: number;
  total_purchasing_price: number;
  total_transactions_today:number;

}

