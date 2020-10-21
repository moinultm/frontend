import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/stock/product.service';
import { Product } from '@app/shared/models/stock/product.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '@app/core/services/security/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { User } from '@app/shared/models/security/user.model';
import { success, warning, error } from '@app/core/utils/toastr';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { Client } from '@app/shared/models/stock/client.model';
import { DamageService } from '@app/core/services/stock/damage.service';
import { Damage } from '@app/shared/models/stock/damage.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productconsumal',
  templateUrl: './productconsumal.component.html',
  styleUrls: ['./productconsumal.component.scss']
})
export class ProductconsumalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
