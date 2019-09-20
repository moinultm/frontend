import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { UserService } from '@services/security/user.service'
import { ProfileService } from '@services/security/profile.service';

import { success, error, warning } from '@app/services/core/utils/toastr';

import { constants } from '@env/constants';
import { User } from '@models/security/user.model';
import { Profile } from '@models/security/profile.model';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
  picturePreview: any;

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

    this.initSaveForm(user);

    this.loadingProfiles = true;
    this.profileService.find()
      .subscribe((res: PartialList<Profile>) => {
        this.profiles = res.data;
        this.loadingProfiles = false;
      });

    this.modalService
      .open(modal)
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
    if (!this.selectedUser.picture) {
      this.picturePreview = 'assets/images/faces/avatar.png';
    } else {
      this.picturePreview = environment.web_url + 'users/picture/' + this.selectedUser.id + '?v=' + Math.random();
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
      password: [
        '',
        user && user.id ? [] : [Validators.required]
      ],
      password_confirmation: [
        '',
        user && user.id ? [] : [Validators.required]
      ],
      user_type: [
        user ? user.name : '',
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


  save(modal: any): void {

    if (this.form.valid) {
      this.savingUser = true;

      const formData = new FormData();
      if (this.selectedUser.picture instanceof File) {
        formData.append('picture', this.selectedUser.picture);
      }
      formData.append('id', this.selectedUser.id + '');
      formData.append('name', this.form.get('name').value);
      formData.append('email', this.form.get('email').value);
      formData.append('password', this.form.get('password').value);
      formData.append('password_confirmation', this.form.get('password_confirmation').value);
      formData.append('profiles', this.selectedUser.profiles.map((p: Profile) => p.id) + '');

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
    this.selectedUser.picture = file;
    if (this.selectedUser && this.selectedUser.picture && this.selectedUser.picture instanceof File) {
      this.previewImage(this.selectedUser.picture);
    } else {
      this.picturePreview = 'assets/images/faces/avatar.png';
    }
  }

  private previewImage(file: File): void {
    if (file.type.match(/image\/*/) == null) {
      this.picturePreview = 'assets/images/faces/avatar.png';
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.picturePreview = reader.result;
      };
    }
  }

  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }

}
