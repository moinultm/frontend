import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Profile } from '@app/shared/models/security/profile.model';
import { Role } from '@app/shared/models/security/role.model';
import { ProfileService } from '@app/core/services/security/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '@app/core/services/security/role.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { constants } from '@env/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { success, error, warning } from '@app/core/utils/toastr';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  data: PartialList<Profile>;
  loading: boolean;
  loadingRoles: boolean;
  savingProfile: boolean;
  deletingProfile: boolean

  page = 1;
  size = 10;
  form: FormGroup
  roles: Array<Role>;
  selectedProfile: Profile;

  CanManage:any;
  currentUserID=0;

  constructor(
    private profileService: ProfileService,
    private roleService: RoleService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    titleService: Title,
    public jwtHelper: JwtHelperService
  ) {
    this.currentUserID=parseInt(this.jwtHelper.id());
    this.CanManage= this.jwtHelper.hasRole('ROLE_ACL_MANAGE');
    titleService.setTitle(constants.app_name + ' - Security - Profiles management');
   }

  ngOnInit() {
    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}

    this.loadData();
  }

  loadData(page?: number): void {
    this.page = page ? page : this.page;
    this.loading = true;
    this.profileService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<Profile>) => {
      this.data = res;
      this.loading = false;
    });
  }


  initSave(modal: any, profile?: Profile): void {
    // Initialize the form group with the profile passed in parameter
    this.initSaveForm(profile);
    // Get the roles list
    this.loadingRoles = true;
    this.roleService.find()
      .subscribe((res: PartialList<Role>) => {
        this.roles = res.data;
        this.loadingRoles = false;
      });
    // Open the profile save modal
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
        // If the modal is dismissed
        this.initSaveForm();
      });
  }


  initSaveForm(profile?: Profile): void {
    // Initialize the selected profile object

    if (profile) {
      this.selectedProfile = Object.assign(Profile, profile);
    } else {
      this.selectedProfile = new Profile();
    }
    // Initialize the form group object
    this.form = this._fb.group({
      code: [
        profile ? profile.code : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      designation: [
        profile ? profile.designation : '',
        [Validators.required, Validators.maxLength(255)]
      ]
    });
  }


  selectedProfileHasRole(role: Role): boolean {

     return this.selectedProfile.roles.some((r: Role) => r.id === role.id);
  }


  selectRole(role: Role): void {
    if (this.selectedProfileHasRole(role)) {
      this.selectedProfile.roles.splice(this.selectedProfile.roles.findIndex((r: Role) => r.id === role.id), 1);
    } else {
      this.selectedProfile.roles.push(role);
    }
  }


  save(modal: any): void {
    // Check if the form is valid
    if (this.form.valid) {
      this.savingProfile = true;
      // Send save / update request to the service
      this.profileService.save({
        id: this.selectedProfile.id,
        code: this.form.get('code').value,
        designation: this.form.get('designation').value,
        roles: this.selectedProfile.roles.map((r: Role) => r.id)
      }, this.selectedProfile.id ? true : false).subscribe((res: Profile) => {
        // Show success alert
        success('Success!', 'The profile is successfully saved.', this._toastr);
        this.savingProfile = false;
        // Close profile save modal
        this.close(modal, true);
      }, (err: any) => {
        // Check if the error status is 403 (Form errors)
        if (err.status === 403) {
          // Show an error for each form validations errors list
          err.error.forEach((e: string) => {
            warning('Warning!', e, this._toastr);
          });
        } else {
          // Else, show an internal server error alert
          error('Error!', 'An error has occured when saving the profile, please contact system administrator.', this._toastr);
        }
        this.savingProfile = false;
      });
    }
  }



  initDelete(modal: any, profile: Profile): void {
    this.selectedProfile = profile;
    // Open the delete confirmation modal
    this.modalService
      .open(modal)
      .result
      .then((result) => {
        if (result) {
          this.loadData();
        }
        this.selectedProfile = new Profile();
      }, () => {
        // If the modal is dismissed
        this.selectedProfile = new Profile();
      });
  }


  delete(modal: any): void {
    this.deletingProfile = true;
    this.profileService.delete({
      id: this.selectedProfile.id
    }).subscribe(() => {
      this.close(modal, true);
      this.deletingProfile = false;
    });
  }


  close(modal: any, flag?: boolean): void {
    modal.close(flag ? true : false);
  }
}
