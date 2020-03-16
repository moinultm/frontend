import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { UserService } from '@app/core/services/security/user.service'
import { ProfileService } from '@app/core/services/security/profile.service';

import { success, error, warning } from '@app/core/utils/toastr';

import { constants } from '@env/constants';
import { User } from '@app/shared/models/security/user.model';
import { Profile } from '@app/shared/models/security/profile.model';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  modalOption: NgbModalOptions = {};

  data: PartialList<User>;
  loading: boolean;
  loadingProfiles: boolean;
  savingUser: boolean;
  deletingUser: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  profiles: Array<Profile>;
  selectedUser: User;
  imagePreview: any;


  userTypeList = [
    {id:2,name:'owner'},
    {id:1,name:'admin'},
    {id:3,name:'user'}
  ]

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    titleService: Title
    ) {

      titleService.setTitle(constants.app_name + ' - Security - Users management');
     }

  ngOnInit() {
    this.loadData();
  }
  //Load Data
  loadData(page?: number): void {
    this.page = page ? page : this.page;
    this.loading = true;
    this.userService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<User>) => {
      this.data = res;
        //console.log( this.data);
      this.loading = false;
    });
  }


  initSave(modal: any, user?: User): void {

    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;

    this.initSaveForm(user);

    this.loadingProfiles = true;
    this.profileService.find()
      .subscribe((res: PartialList<Profile>) => {
        this.profiles = res.data;
        this.loadingProfiles = false;
      });

    this.modalService
      .open(modal,this.modalOption)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        } else {
          this.initSaveForm();
        }
      }, () => {

        this.initSaveForm();
      });
  }

  initSaveForm(user?: User): void {

    if (user) {
      this.selectedUser = Object.assign({}, user);
    } else {
      this.selectedUser = new User();
    }

    if (!this.selectedUser.image) {
      this.imagePreview = 'assets/images/faces/avatar.png';
    } else {
      //      this.imagePreview = environment.web_url + 'users/image/' + this.selectedUser.id + '?v=' + Math.random();
      this.imagePreview = environment.uploads_url + 'users/images/' + this.selectedUser.image ;
    }

    this.form = this._fb.group({
      email: [
        user ? user.email : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      name: [
        user ? user.name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      phone: [
        user ? user.phone : '01',
        [Validators.required, Validators.maxLength(55)]
      ],
      address: [
        user ? user.address : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      password: [
        '',
        user && user.id ? [] : [Validators.required]
      ],
      password_confirmation: [
        '',
        user && user.id ? [] : [Validators.required]
      ],
      user_type: [
        user ? user.user_type : '',
        [Validators.required, Validators.maxLength(255)]
      ],
    });
  }

  selectedUserHasProfile(profile: Profile): boolean {
    return this.selectedUser.profiles.some((r: Profile) => r.id === profile.id);
  }

  selectProfile(profile: Profile): void {
    if (this.selectedUserHasProfile(profile)) {
      this.selectedUser.profiles.splice(this.selectedUser.profiles.findIndex((r: Profile) => r.id === profile.id), 1);
    } else {
      this.selectedUser.profiles.push(profile);
    }
  }

  profileItemList: Array<Profile>=[];


  save(modal: any): void {
 var myArr =    this.selectedUser.profiles.map((p: Profile) => p.id)+'' ;
 var string = myArr.split(',') ;

    if (this.form.valid) {
      this.savingUser = true;

      const formData = new FormData();


      if (this.selectedUser.image instanceof File) {
        formData.append('image', this.selectedUser.image);
      }


      formData.append('id', this.selectedUser.id + '');
      formData.append('name', this.form.get('name').value);
      formData.append('phone', this.form.get('phone').value);
      formData.append('address', this.form.get('address').value);
      formData.append('email', this.form.get('email').value);
      formData.append('password', this.form.get('password').value);
      formData.append('password_confirmation', this.form.get('password_confirmation').value);
      formData.append('user_type', this.form.get('user_type').value);
      formData.append('profiles', this.selectedUser.profiles.map((p: Profile) => p.id)+''  );



      this.userService.save(formData, this.selectedUser.id ? true : false).subscribe((res: User) => {

        success('Success!', 'The user is successfully saved.', this._toastr);
        this.savingUser = false;

        this.close(modal, true);
      }, (err: any) => {

        if (err.status === 403) {

          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          error('Error!', 'An error has occured when saving the user, please contact system administrator.', this._toastr);
        }
        this.savingUser = false;
      });
    }
  }


  onImageChanged(file): void {
    this.selectedUser.image = file;
    if (this.selectedUser && this.selectedUser.image && this.selectedUser.image instanceof File) {
      this.previewImage(this.selectedUser.image);
    } else {
      this.imagePreview = 'assets/images/faces/avatar.png';
    }
  }

  private previewImage(file: File): void {
    if (file.type.match(/image\/*/) == null) {
      this.imagePreview = 'assets/images/faces/avatar.png';
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imagePreview = reader.result;
      };
    }
  }

  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
