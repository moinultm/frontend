import { Component, OnInit } from '@angular/core';

import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PartialList } from 'src/app/models/common/patial-list.model';


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
  selectedRole: Role;

  constructor(  private roleService: RoleService) {

    }

  ngOnInit() {
    this.loadData();
     }

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



}
