import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';
import { UserRoleEnum } from '../entities/user-role.enum';
import { User } from '../entities/user.schema';

export class AddUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  role?: UserRoleEnum;
}

export class UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;

  static fromUser(user: Partial<User>): UserDTO {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
