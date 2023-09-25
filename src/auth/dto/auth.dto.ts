import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @ApiProperty({ example: 'example_email', description: 'The user email' })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'example_password', description: 'The user password' })
  readonly password: string;
}
