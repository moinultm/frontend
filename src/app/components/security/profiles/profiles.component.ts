import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { Profile } from '@models/security/profile.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '@models/security/role.model';
import { ProfileService } from '@services/security/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '@services/security/role.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { constants } from '@env/constants';


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

  constructor(
    private profileService: ProfileService,
    private roleService: RoleService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    titleService: Title
  ) {
    titleService.setTitle(constants.app_name + ' - Security - Profiles management');
   }

  ngOnInit() {
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

}
