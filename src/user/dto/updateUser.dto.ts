import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    title: 'First name',
    description: 'User real first name.',
  })
  @IsString()
  firstName?: string;

  @ApiProperty({
    title: 'Last name',
    description: 'User real last name.',
  })
  @IsString()
  lastName?: string;
}
