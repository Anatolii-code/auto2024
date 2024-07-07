import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseCarReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  brand: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  model: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  price: string;

  @IsString()
  @Length(3, 10)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  valute: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  locate: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @IsString()
  @Length(0, 4000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

}
