import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '../interfaces/user.interface';

@Exclude()
export class UserDto implements UserInterface {
  @Expose()
  id!: string;
  @Expose()
  username!: string;
  password!: string;
  salt!: string;
  @Expose()
  firstName!: string;
  @Expose()
  lastName!: string;
  @Expose()
  email!: string;
  @Expose()
  active!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
