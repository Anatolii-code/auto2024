import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './base-car.req.dto';

export class CreateCarReqDto extends PickType(BaseCarReqDto, [
  'brand',
  'model',
  'price',
  'valute',
  'locate',
  'description',
  'body',
]) {}
