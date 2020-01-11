import { Component, OnInit } from '@angular/core';

import { Role } from '@app/shared/models/security/role.model';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '@app/core/services/security/role.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { ToastrService } from 'ngx-toastr';
import { success, error, warning } from '@app/core/utils/toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  data: PartialList<Role>;
  loading: boolean;
  savingRole: boolean;
  deletingRole: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  selectedRole: Role;

  CanManage:any;
  currentUserID=0;

  constructor(
    private roleService: RoleService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
        private _formBuilder: FormBuilder,
        public jwtHelper: JwtHelperService) {
      titleService.setTitle('Security - Roles management');
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.CanManage= this.jwtHelper.hasRole('ROLE_ACL_MANAGE');

    }

  ngOnInit(): void {
    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}

     this.loadData();
     }

     //Loading Data
     loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      this.roleService.find({
        page: this.page,
        size: this.size
      }).subscribe((res: PartialList<Role>) => {
        this.data = res;
        this.loading = false;
      });
    }

    //Save Data
    initSave(modal: any, role?: Role): void {
      this.initSaveForm(role);
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

    initSaveForm(role?: Role): void {
      if (role) {
        this.selectedRole = Object.assign(Role, role);
      } else {
        this.selectedRole = new Role();
      }
      this.form = this._formBuilder.group({
        code: [
          role ? role.code : '',
          [Validators.required, Validators.maxLength(255)]
        ],
        designation: [
          role ? role.designation : '',
          [Validators.required, Validators.maxLength(255)]
        ]
      });
    }

//main Save function
    save(modal: any): void {
      if (this.form.valid) {
        this.savingRole = true;
        this.roleService.save({
          id: this.selectedRole.id,
          code: this.form.get('code').value,
          designation: this.form.get('designation').value
        }, this.selectedRole.id ? true : false).subscribe((res: Role) => {
          success('Success!', 'The role is successfully saved.', this._toastr);
          this.savingRole = false;
          this.close(modal, true);
        }, (err: any) => {
          if (err.status === 403) {
            err.error.forEach((e: string) => {
              warning('Warning!', e, this._toastr);
            });
          } else {
            error('Error!', 'An error has occured when saving the role, please contact system administrator.', this._toastr);
          }
          this.savingRole = false;
        });
      }
    }
  //Delete
    delete(modal: any): void {
      this.deletingRole = true;
      this.roleService.delete({
        id: this.selectedRole.id
      }).subscribe(() => {
        this.close(modal, true);
        this.deletingRole = false;
      });
    }

    initDelete(modal: any, role: Role): void {
      this.selectedRole = role;
      // Open the delete confirmation modal
      this.modalService
        .open(modal)
        .result
        .then((result) => {
          if (result) {
            this.loadData();
          }
          this.selectedRole = new Role();
        }, () => {
          // If the modal is dismissed
          this.selectedRole = new Role();
        });
    }

    //Close Module
    close(modal: any, flag?: boolean): void {
      modal.close(flag ? true : false);
    }

}
