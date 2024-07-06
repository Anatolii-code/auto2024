import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarMapper } from './car.mapper';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly CarRepository: CarRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async getList(userData: IUserData, query: any): Promise<any> {
    const [entities, total] = await this.CarRepository.getList(userData, query);
    return { entities, total };
  }

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const tags = await this.createTags(dto.tags);
    const Car = await this.CarRepository.save(
      this.CarRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );
    return CarMapper.toResponseDTO(Car);
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = new Set(entities.map((tag) => tag.name));
    const newTags = tags.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((name) => this.tagRepository.create({ name })),
    );
    return [...entities, ...newEntities];
  }

  public async getById(userData: IUserData, CarId: string): Promise<CarResDto> {
    const Car = await this.CarRepository.findCarById(userData, CarId);
    if (!Car) {
      throw new NotFoundException('Car not found');
    }
    return CarMapper.toResponseDTO(Car);
  }

  public async updateById(
    userData: IUserData,
    CarId: string,
    dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    const Car = await this.findMyCarByIdOrThrow(userData.userId, CarId);
    await this.CarRepository.save({ ...Car, ...dto });
    const updatedCar = await this.CarRepository.findCarById(userData, CarId);
    return CarMapper.toResponseDTO(updatedCar);
  }

  public async deleteById(userData: IUserData, CarId: string): Promise<void> {
    const Car = await this.findMyCarByIdOrThrow(userData.userId, CarId);
    await this.CarRepository.remove(Car);
  }

  public async findMyCarByIdOrThrow(
    userId: string,
    CarId: string,
  ): Promise<CarEntity> {
    const Car = await this.CarRepository.findOneBy({
      id: CarId,
    });
    if (!Car) {
      throw new NotFoundException('Car not found');
    }
    if (Car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return Car;
  }
}
