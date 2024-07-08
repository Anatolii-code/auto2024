import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseUserReqDto {
  @IsOptional()

  @ApiProperty({ example: 'Alan' })
  @IsString()
  @Length(3, 40)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ enum: ['base', 'premium', 'banned']})
  type: string;

  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
  role: UserRole;


  @ApiProperty({ example: 'email1@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: 'HardPassword123!!' })
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  deviceId: string;
}
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}
