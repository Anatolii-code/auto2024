import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({
    example: '121324354678976543fdg',
    description: 'The id of the User',
  })
  id: string;

  @ApiProperty({
    example: 'Sasuke Uchiha',
    description: 'The name of the User',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'email1@gmail.com',
    description: 'The email of the User',
  })
  public readonly email: string;

  @ApiProperty({
    example: 'premium',
    description: 'The type of the User',
  })
  public readonly type?: string;

  @ApiProperty({
    example: 'admin',
    description: 'The role of user in platform',
  })
  public readonly role?: string;

}
