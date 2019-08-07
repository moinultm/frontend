import { Profile } from './profile.model';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
  password_token: string;
  //ProfileSection
  profiles: Array<Profile>;
  picture: any;
  constructor() {
      this.profiles = [];
  }
}
