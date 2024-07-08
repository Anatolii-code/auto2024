import { Module } from '@nestjs/common';

import { CarController } from './car.controller';
import { CarService } from './services/car.service';
import { FileStorageService } from '../file-storage/services/file-storage.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, FileStorageService],
  exports: [CarService],
})
export class CarModule {}
