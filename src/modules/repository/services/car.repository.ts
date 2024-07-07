import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async getList(
    userData: IUserData,
    query: any,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.user', 'user');

    qb.setParameter('myId', userData.userId);

    qb.orderBy('car.created', 'DESC');
    qb.take(query.limit || 5);
    qb.skip(query.offset || 0);

    return await qb.getManyAndCount();
  }

  public async findCarById(
    userData: IUserData,
    carId: string,
  ): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.user', 'user');

    qb.where('car.id = :carId');
    qb.setParameter('carId', carId);
    qb.setParameter('myId', userData.userId);

    return await qb.getOne();
  }
}
