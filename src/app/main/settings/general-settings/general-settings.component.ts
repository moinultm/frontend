import { Component, OnInit } from '@angular/core';
import { Settings } from '@app/shared/models/common/settings.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vat } from '@app/shared/models/common/Vat.model';
import { VatService } from '@app/core/services/common/vat.service';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '@app/core/services/common/settings.service';
import { warning, success, error } from '@app/core/utils/toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {


  data: PartialList<Settings>;
  loading: boolean;
  loadingVat: boolean;
  savingSettings: boolean;
  deletingItem: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  listVat: PartialList <Vat>;
  selectedSetup: Settings;

  logoPreview: any;
  invoicePreview: any;

 lteThemes:Array<Object>=
    [    {id:1,name:'admin-lte-3'}
  ];
  lteDashboard:Array<Object>=
  [    {id:1,name:'default'},
  {id:2,name:'chart-box'}
];

lteActivity:Array<Object>=
[    {id:1,name:'Enable'},
      {id:0,name:'Disable'},
];

  constructor(private vatService: VatService,
    private settingService: SettingsService,
    titleService: Title,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private router: Router,

    ) {
    titleService.setTitle('General - Settings management');
  }

  ngOnInit() {
   this.getDefault( );
   this.loadVat();
  }

  //Load Vat
  loadVat(page?: number): void {
    this.page = page ? page : 1;
    this.loadingVat = true;
    this.vatService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Vat>) => {
      this.listVat = res;
      this.loadingVat = false;
    });
  }

  getDefault(): void {
    this.loading=true;
    this.settingService.find()
      .subscribe(
        (res:   Settings ) => {
         // console.log(res)
          this.initForm(res),
          this.loading = false;
        },
        (err: any) => {  if (err.status === 404) {
          err.error.forEach((e: string) => {
            warning('Warning not getting the id!', e, this._toastr);
          });
        } }

      );
  }


  //iniform
  initForm(settings?: Settings): void {
    if (settings) {
      this.selectedSetup =  settings ;
    } else {
      this.selectedSetup = new Settings();
    }

    if (!this.selectedSetup.site_logo) {
      this.logoPreview = 'assets/images/menu_icons/30.png';
    } else {
      //      this.imagePreview = environment.web_url + 'users/image/' + this.selectedUser.id + '?v=' + Math.random();
      this.logoPreview = environment.uploads_url + 'site/' + this.selectedSetup.site_logo ;
    }

    if (!this.selectedSetup.invoice_header) {
      this.invoicePreview = 'assets/images/menu_icons/28.png';
    } else {
      //      this.imagePreview = environment.web_url + 'users/image/' + this.selectedUser.id + '?v=' + Math.random();
      this.invoicePreview = environment.uploads_url + 'site/' + this.selectedSetup.invoice_header ;
    }


    this.form = this._formBuilder.group({
      site_name: [settings ? settings.site_name : '', [Validators.required, Validators.maxLength(255)] ],
      slogan: [settings ? settings.slogan : '', [Validators.nullValidator ]],
      address: [settings ? settings.address : '',      [Validators.required]  ],
      email: [settings ? settings.email : '',      [Validators.required]  ],
      phone: [settings ? settings.phone : '',      [Validators.required]  ],
      owner_name: [settings ? settings.owner_name : '',      [Validators.nullValidator]  ],
      //site_logo: [settings ? settings.site_logo : '',      [Validators.nullValidator]  ],
      currency_code: [settings ? settings.currency_code : '',      [Validators.nullValidator]  ],
      alert_quantity: [settings ? settings.alert_quantity : 0,      [Validators.nullValidator]  ],
      invoice_tax: [settings ? settings.invoice_tax : '',      [Validators.nullValidator]  ],
      invoice_tax_rate: [settings ? settings.invoice_tax_rate : '',      [Validators.nullValidator]  ],
      invoice_tax_type: [settings ? settings.invoice_tax_type : '',      [Validators.nullValidator]  ],
      theme: [settings ? settings.theme : '',      [Validators.nullValidator]  ],
      vat_no: [settings ? settings.vat_no : '',      [Validators.nullValidator]  ],
      enable_purchaser: [settings ? settings.enable_purchaser : '',      [Validators.nullValidator]  ],
      enable_customer: [settings ? settings.enable_customer : '',      [Validators.nullValidator]  ],
      pos_invoice_footer_text: [settings ? settings.pos_invoice_footer_text : '',      [Validators.nullValidator]  ],
      dashboard: [settings ? settings.dashboard : '',      [Validators.nullValidator]  ],
      product_tax: [settings ? settings.product_tax : '',      [Validators.nullValidator]  ]
    });
  }

  saveForm(form: any): void {
    if (this.form.valid) {
      this.savingSettings = true;

      const formData = new FormData();


      if (this.selectedSetup.site_logo instanceof File) {
        formData.append('site_logo', this.selectedSetup.site_logo);
      }

      if (this.selectedSetup.invoice_header instanceof File) {
        formData.append('invoice_header', this.selectedSetup.invoice_header);
      }



      formData.append('id', this.selectedSetup.id + '');
      formData.append('site_name', this.form.get('site_name').value);
      formData.append('slogan', this.form.get('slogan').value);
      formData.append('address', this.form.get('address').value);
      formData.append('email', this.form.get('email').value);
      formData.append('phone', this.form.get('phone').value);
      formData.append('owner_name', this.form.get('owner_name').value);
      //formData.append('site_logo', this.form.get('site_logo').value);
      formData.append('currency_code', this.form.get('currency_code').value);
      formData.append('alert_quantity', this.form.get('alert_quantity').value);
      formData.append('invoice_tax', this.form.get('invoice_tax').value);
      formData.append('invoice_tax_rate', this.form.get('invoice_tax_rate').value);
      formData.append('invoice_tax_type', this.form.get('invoice_tax_type').value);
      formData.append('theme', this.form.get('theme').value);
      formData.append('vat_no', this.form.get('vat_no').value);
      formData.append('enable_customer', this.form.get('enable_customer').value);
      formData.append('enable_purchaser', this.form.get('enable_purchaser').value);
      formData.append('pos_invoice_footer_text', this.form.get('pos_invoice_footer_text').value);
      formData.append('dashboard', this.form.get('dashboard').value);
      formData.append('product_tax', this.form.get('product_tax').value);


      this.settingService.save(formData, this.selectedSetup.id ? true : false).subscribe((res: Settings) => {
        success('Success!', 'The Data is successfully saved.', this._toastr);
        this.savingSettings = false;
        this.getDefault( );

      }, (err: any) => {
        if (err.status === 403) {
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error! Ahh', 'An error has occured when saving the data, please contact system administrator.', this._toastr);
        }
        this.savingSettings = false;

      });
    }
    }



    //Image workings
    onLogoImageChanged(file): void {
      this.selectedSetup.site_logo = file;
      if (this.selectedSetup && this.selectedSetup.site_logo && this.selectedSetup.site_logo instanceof File) {
        this.previewLogoImage(this.selectedSetup.site_logo);
      } else {
        this.logoPreview = 'assets/images/menu_icons/30.png';
      }
    }

    private previewLogoImage(file: File): void {
      if (file.type.match(/image\/*/) == null) {
        this.logoPreview = 'assets/images/menu_icons/30.png';
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.logoPreview = reader.result;
        };
      }
    }

//Image workings
onInvoiceImageChanged(file): void {
  this.selectedSetup.invoice_header = file;
  if (this.selectedSetup && this.selectedSetup.invoice_header && this.selectedSetup.invoice_header instanceof File) {
    this.previewInvoiceImage(this.selectedSetup.invoice_header);
  } else {
    this.invoicePreview = 'assets/images/menu_icons/28.png';
  }
}

private previewInvoiceImage(file: File): void {
  if (file.type.match(/image\/*/) == null) {
    this.invoicePreview = 'assets/images/menu_icons/28.png';
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.invoicePreview = reader.result;
    };
  }
}


  }


