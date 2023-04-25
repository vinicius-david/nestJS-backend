import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import checkPasswordStrength from '../common/utils/checkPasswordStrength';
import { FindByNameOrEmailDto } from './dto/findByNameOrEmail.dto';

@Injectable()
export class UserService {
  public users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email, firstName, lastName } = createUserDto;
    if (!username) {
      throw new BadRequestException('Username is required');
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!firstName) {
      throw new BadRequestException('First name is required');
    }
    if (!lastName) {
      throw new BadRequestException('Last name is required');
    }

    if (!checkPasswordStrength(password)) {
      throw new BadRequestException(
        'Your password should contain at upper case and lower case letters, numbers and symbols.',
      );
    }

    const userFound = this.findByNameOrEmail({ username, email });

    if (userFound && userFound.email === email) {
      throw new BadRequestException('Email already in use.');
    }

    if (userFound && userFound.username === username) {
      throw new BadRequestException('Username already in use.');
    }

    const user = new User();

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    user.id = uuidv4();
    user.username = username;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = salt;
    user.password = hashedPassword;
    user.active = true;

    this.users.push(user);

    return plainToInstance(UserDto, user);
  }

  findAll(): UserDto[] {
    const users = this.users;
    return plainToInstance(UserDto, users);
  }

  findOne(@Param(':id') id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  findByNameOrEmail(findByNameOrEmailDto: FindByNameOrEmailDto) {
    const { email, username } = findByNameOrEmailDto;
    const user = this.users.find(
      (u) => u.email === email || u.username === username,
    );

    return user;
  }

  update(@Param(':id') id: string, updateUserDto: UpdateUserDto) {
    let updatedUser: User;

    this.users = this.users.map((user) => {
      if (user.id === id) {
        updatedUser = {
          ...user,
          firstName: updateUserDto.firstName
            ? updateUserDto.firstName
            : user.firstName,
          lastName: updateUserDto.lastName
            ? updateUserDto.lastName
            : user.lastName,
        };

        return updatedUser;
      }

      return user;
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }

    return updatedUser;
  }

  remove(@Param(':id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(userIndex, 1);

    return;
  }
}
