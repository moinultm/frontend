import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import{ jqxPivotGridComponent } from 'jqwidgets-ng/jqxpivotgrid';
import { jqxPivotDesignerComponent } from 'jqwidgets-ng/jqxpivotdesigner';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-stock-general-report',
  templateUrl: './stock-general-report.component.html',
  styleUrls: ['./stock-general-report.component.scss']
})
export class StockGeneralReportComponent implements OnInit{


  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe)	{

  	}

    ngOnInit(){
      this.iniForm();
    }



    iniForm(){
      this.form = this._fb.group({
        fromDate: [  '',  [Validators.nullValidator],],
        toDate: [  '',  [Validators.nullValidator],]
      });
    }



  beers:Array<Object> = [
  { id: 27, description: "Product 1",  opening: 0, inward:5,sales:3,damage:2,gift:2},
  { id: 28, description: "Product 2",opening: 0, inward:5,sales:3,damage:2,gift:2 },
  { id: 29, description: "Product 3",opening: 0, inward:5,sales:3,damage:2,gift:2 } ];


  characteristics:Array<Object> = [
    { id: 3, discount: "50%" },
    { id: 4, discount: "25%" },
    { id: 5, discount: "20%" },
    { id: 6, discount: "10%"}];


    crossData:Array<Object> = [
      { beerId: 27, characteristicId: 3, quantity: 1,value:100 },
      { beerId: 27, characteristicId: 4, quantity: 2,value:100  },
      { beerId: 27, characteristicId: 5, quantity: 1,value:100  },
      { beerId: 27, characteristicId: 6, quantity: 3,value:100  },
      { beerId: 28, characteristicId: 3, quantity: 1,value:100  },
      { beerId: 28, characteristicId: 4, quantity: 1,value:100  },
      { beerId: 28, characteristicId: 5, quantity: 4,value:100  },
      { beerId: 28, characteristicId: 6, quantity: 5,value:100  },
      { beerId: 29, characteristicId: 3, quantity: 6,value:100  },
      { beerId: 29, characteristicId: 4, quantity: 5,value:100  },
      { beerId: 29, characteristicId: 5, quantity: 6,value:100  },
      { beerId: 29, characteristicId: 6, quantity: 1,value:100  }];


}




