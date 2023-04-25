import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    title: 'Username',
    description: 'User unique name used for login.',
    minLength: 4,
    maxLength: 20,
  })
  @MinLength(4)
  username!: string;

  @ApiProperty({
    title: 'Password',
    description: 'User strong password used for login.',
    minLength: 8,
    maxLength: 60,
  })
  @MinLength(8)
  password!: string;

  @ApiProperty({
    title: 'First name',
    description: 'User real first name.',
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    title: 'Last name',
    description: 'User real last name.',
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    title: 'Email',
    description: 'User email.',
  })
  @IsString()
  @IsEmail()
  email!: string;
}
