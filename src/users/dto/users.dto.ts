import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsUrl,
  IsEmail,
} from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsString()
  permanent?: string;

  @IsOptional()
  @IsString()
  present?: string;
}

export class UserDto {
  @IsNotEmpty({ message: 'User name is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString()
  confirmPassword: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  address?: AddressDto;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsUrl()
  profileImg?: string;
}
