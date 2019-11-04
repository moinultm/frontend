import { User } from './user.model';
import { Role } from './role.model';

export class Profile {
  id: number;
  code: string;
  designation: string;

  roles: Array<Role>;
  users: Array<User>;
  constructor() {
      this.roles = [];
  }
}

