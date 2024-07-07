import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../user/dto/res/user.res.dto';

export class CarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'Car brand',
    description: 'Car brand',
  })
  brand: string;

  @ApiProperty({
    example: 'Car model',
    description: 'Car model',
  })
  model: string;

  @ApiProperty({
    example: 'Car price',
    description: 'Car price',
  })
  price: string;

  @ApiProperty({
    example: 'Car price valute',
    description: 'Car price valute',
  })
  valute: string;

  @ApiProperty({
    example: 'Car locate',
    description: 'Car locate',
  })
  locate: string;


  @ApiProperty({
    example: 'Car Description',
    description: 'Car Description',
  })
  description: string;

  @ApiProperty({
    example: 'Car Body',
    description: 'Car Body',
  })
  body: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Car Updated Date',
  })
  updated: Date;

  // @ApiProperty({
  //   example: ['16'],
  //   description: 'Car views',
  // })
  // views?: string;

  user?: UserResDto;
}
