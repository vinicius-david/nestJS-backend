import { MinLength, IsString, IsEmail } from 'class-validator';

export class FindByNameOrEmailDto {
  @IsString()
  @MinLength(4)
  username!: string;
  @IsString()
  @IsEmail()
  email!: string;
}
