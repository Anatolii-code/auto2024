import { Global, Module } from '@nestjs/common';

import { CarRepository } from './services/car.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  CarRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
