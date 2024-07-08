import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';

export class BaseCarReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'BMW'})
  brand: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'X5'})
  model: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: '19900'})
  price: string;

  @IsString()
  @Length(3, 10)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'EUR'})
  valute: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'Lviv'})
  locate: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'lorem'})
  description: string;

  @IsString()
  @Length(0, 4000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({example: 'lorem20'})
  body: string;

}
