import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';

import { User } from '@models/user.model';

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
  form: FormGroup;
  profiles: Array<Profile>;
  selectedUser: User;
  picturePreview: any;

  constructor() { }

  ngOnInit() {
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
      this.loading = false;
    });
  }


}
