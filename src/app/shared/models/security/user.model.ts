import { Profile } from './profile.model';

export class User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
  password_token: string;
  //ProfileSection
  profiles: Array<Profile>;
  image: any;
  user_type:number;
  constructor() {
      this.profiles = [];
  }
}
