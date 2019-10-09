import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

 
import{ jqxPivotGridComponent } from 'jqwidgets-ng/jqxpivotgrid';           
import { jqxPivotDesignerComponent } from 'jqwidgets-ng/jqxpivotdesigner';
 

@Component({
  selector: 'app-stock-general-report',
  templateUrl: './stock-general-report.component.html',
  styleUrls: ['./stock-general-report.component.scss']
})
export class StockGeneralReportComponent  

{
  constructor()
	{
		this.pivotDataSource = this.createPivotDataSource();
	}
	
	pivotDataSource: null;
 
 	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}
	createPivotDataSource(): any {
		// prepare sample data
		let data = new Array();
		let firstNames =
		[
			"Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
		];
		let lastNames =
		[
			"Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
		];
		let productNames =
		[
			"Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
		];
		let priceValues =
		[
			"2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
		];
		for (let i = 0; i < 500; i++) {
			let row = {};
			let productindex = Math.floor(Math.random() * productNames.length);
			let price = parseFloat(priceValues[productindex]);
			let quantity = 1 + Math.round(Math.random() * 10);
			row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
			row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
			row["productname"] = productNames[productindex];
			row["price"] = price;
			row["quantity"] = quantity;
			row["total"] = price * quantity;
			data[i] = row;
		}
		// create a data source and data adapter
		let source =
		{
		   localdata: data,
		   datatype: "array",
		   datafields:
		   [
				{ name: 'firstname', type: 'string' },
				{ name: 'lastname', type: 'string' },
				{ name: 'productname', type: 'string' },
				{ name: 'quantity', type: 'number' },
				{ name: 'price', type: 'number' },
				{ name: 'total', type: 'number' }
		   ]
		};
		let dataAdapter = new jqx.dataAdapter(source);
		dataAdapter.dataBind();
		
		// create a pivot data source from the dataAdapter
		let pivotDataSource = new jqx.pivot(
		   dataAdapter,
		   {
				customAggregationFunctions: {
					'var': function (values) {
						if (values.length <= 1)
							return 0;
						// sample's mean
						var mean = 0;
						for (var i = 0; i < values.length; i++)
							mean += values[i];
						mean /= values.length;
						// calc squared sum
						var ssum = 0;
						for (var i = 0; i < values.length; i++)
							ssum += Math.pow(values[i] - mean, 2)
						// calc the variance
						var variance = ssum / values.length;
						return variance;
					}
				},
				pivotValuesOnRows: false,
				rows: [{ dataField: 'firstname' }, { dataField: 'lastname'}],
				columns: [{ dataField: 'productname'}],
				filters: [
					{
						dataField: 'productname',
						filterFunction: function (value) {
							if (value == "Black Tea" || value == "Green Tea")
								return true;
							return false;
						}
					}
				],
				values: [
					{ dataField: 'price', 'function': 'sum', text: 'sum', formatSettings: { prefix: '$', decimalPlaces: 2, align: 'right' } },
					{ dataField: 'price', 'function': 'count', text: 'count' },
					{
						dataField: 'quantity',
						text: 'variance',
						'function': 'var',
						formatSettings: { decimalPlaces: 2 }
					}
				]
		   }
		);
		
		return pivotDataSource;		
	}

  beers:Array<Object> = [
  { id: 27, description: "Product 1" },
  { id: 28, description: "Product 2" },
  { id: 29, description: "Product 3" } ];

  
  characteristics:Array<Object> = [
    { id: 3, description: "ABV" },
    { id: 4, description: "IBU" },
    { id: 5, description: "Calories" },
    { id: 6, description: "Reviews"}];


    crossData:Array<Object> = [
      { beerId: 27, characteristicId: 3, value: 10 },
      { beerId: 27, characteristicId: 4, value: 70 },
      { beerId: 27, characteristicId: 5, value: 300 },
      { beerId: 27, characteristicId: 6, value: 3419 },
      { beerId: 28, characteristicId: 3, value: 11 },
      { beerId: 28, characteristicId: 4, value: 70 },
      { beerId: 28, characteristicId: 5, value: 336 },
      { beerId: 28, characteristicId: 6, value: 2949 },
      { beerId: 29, characteristicId: 3, value: 6 },
      { beerId: 29, characteristicId: 4, value: 50 },
      { beerId: 29, characteristicId: 5, value: 186 },
      { beerId: 29, characteristicId: 6, value: 1454 }];

 

 


source =
{
    datatype: "xml",
    datafields: [
        { name: 'ProductName', type: 'string' },
        { name: 'QuantityPerUnit', type: 'int' },
        { name: 'UnitPrice', type: 'float' },
        { name: 'UnitsInStock', type: 'float' },
        { name: 'Discontinued', type: 'bool' }
    ],
    root: "Products",
    record: "Product",
    id: 'ProductID',
    url: "../sampledata/products.xml"
};

dataAdapter = new jqx.dataAdapter(this.source);

cellsrenderer = (row, columnfield, value, defaulthtml, columnproperties, rowdata) =>
{
    if (value < 20)
    {
        return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    }
    else
    {
        return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
};

columns: any[] =
[
{
  text: 'Product Name', columngroup: 'ProductDetails',
  datafield: 'ProductName', width: 250
},
{
  text: 'Quantity per Unit', columngroup: 'ProductDetails',
  datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right', width: 200
},
{
  xt: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2', width: 200
},
{
  t: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: this.cellsrenderer, width: 100
},
{
  xt: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued'
}
];

columngroups: any[] = [ { text: 'Product Details', align: 'center', name: 'ProductDetails' } ];
 
}
 



