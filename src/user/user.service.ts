import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  public users: User[] = [];

  async create(createUserDto: CreateUserDto) {
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

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = {
      ...createUserDto,
      id: uuidv4(),
      salt: salt,
      password: hashedPassword,
      active: true,
    };

    this.users.push(user);

    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(@Param(':id') id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

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
