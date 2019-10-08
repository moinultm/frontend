import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import{ jqxPivotGridComponent } from 'jqwidgets-ng/jqxpivotgrid';           
 
@Component({
  selector: 'app-stock-general-report',
  templateUrl: './stock-general-report.component.html',
  styleUrls: ['./stock-general-report.component.scss']
})
export class StockGeneralReportComponent implements  OnInit 
{
  constructor()
  {
      this.pivotDataSource = this.createPivotDataSource();
  }


  ngOnInit(){

  }

  pivotDataSource: null;

  createPivotDataSource(): any {
      // Prepare Sample Data
      let data = new Array();

      const countries =
      [
          'Germany', 'France', 'United States', 'Italy', 'Spain', 'Finland', 'Canada', 'Japan', 'Brazil', 'United Kingdom', 'China', 'India', 'South Korea', 'Romania', 'Greece'
      ];

      const dataPoints =
      [
          '2.25', '1.5', '3.0', '3.3', '4.5', '3.6', '3.8', '2.5', '5.0', '1.75', '3.25', '4.0'
      ];

      for (let i = 0; i < countries.length * 2; i++) {
          let row = {};
          const value = parseFloat(dataPoints[Math.round((Math.random() * 100)) % dataPoints.length]);
          row['country'] = countries[i % countries.length];
          row['value'] = value;
          data[i] = row;
      }

      // Create a Data Source and Data Adapter
      const source =
      {
          localdata: data,
          datatype: 'array',
          datafields:
          [
            { name: 'country', type: 'string' },
            { name: 'value', type: 'number' }
          ]
      };

      const dataAdapter = new jqx.dataAdapter(source);
      dataAdapter.dataBind();

      // Create a Pivot Data Source from the DataAdapter
      const pivotDataSource = new jqx.pivot(
          dataAdapter,
          {
              pivotValuesOnRows: false,
              rows: [{ dataField: 'country', width: 190 }],
              columns: [],
              values: 
              [
                  { dataField: 'value', width: 200, 'function': 'min', text: 'cells left alignment', formatSettings: { align: 'left', prefix: '', decimalPlaces: 2 } },
                  { dataField: 'value', width: 200, 'function': 'max', text: 'cells center alignment', formatSettings: { align: 'center', prefix: '', decimalPlaces: 2 } },
                  { dataField: 'value', width: 200, 'function': 'average', text: 'cells right alignment', formatSettings: { align: 'right', prefix: '', decimalPlaces: 2 } }
              ]
          }
      );

      return pivotDataSource;
  }
}