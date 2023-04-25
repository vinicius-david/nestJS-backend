import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { isUUIDParam } from '../common/decorators/isUuidParam';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@isUUIDParam('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@isUUIDParam('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@isUUIDParam('id') id: string) {
    return this.userService.remove(id);
  }
}
