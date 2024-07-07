import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { ViewEntity } from '../../../database/entities/view.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarMapper } from './car.mapper';
import { ICarData } from '../interfaces/car-data.interface';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
    return CarMapper.toResponseDTO(car);
  }

  public async uploadImage(
    carData: ICarData,
    image: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      image,
      ContentType.IMAGE,
      userData.userId,
    );
    await this.userRepository.update(userData.userId, { image });
  }

  public async getList(userData: IUserData, query: any): Promise<any> {
    const [entities, total] = await this.carRepository.getList(
      userData,
      query,
    );
    return { entities, total };
  }

  public async getById(
    userData: IUserData,
    carId: string,
  ): Promise<CarResDto> {
    const car = await this.carRepository.findCarById(
      userData,
      carId,
    );
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return CarMapper.toResponseDTO(car);
  }

  public async updateById(
    userData: IUserData,
    carId: string,
    dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    const car = await this.findMyCarByIdOrThrow(
      userData.userId,
      carId,
    );
    await this.carRepository.save({ ...car, ...dto });
    const updatedCar = await this.carRepository.findCarById(
      userData,
      carId,
    );
    return CarMapper.toResponseDTO(updatedCar);
  }

  public async deleteById(
    userData: IUserData,
    carId: string,
  ): Promise<void> {
    const car = await this.findMyCarByIdOrThrow(
      userData.userId,
      carId,
    );
    await this.carRepository.remove(car);
  }

  public async findMyCarByIdOrThrow(
    userId: string,
    carId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({
      id: carId,
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }
}
