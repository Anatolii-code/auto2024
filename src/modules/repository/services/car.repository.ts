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
    const qb = this.createQueryBuilder('Car');
    qb.leftJoinAndSelect('Car.tags', 'tag');
    qb.leftJoinAndSelect('Car.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
    );
    qb.setParameter('myId', userData.userId);

    qb.orderBy('Car.created', 'DESC');
    qb.take(query.limit || 5);
    qb.skip(query.offset || 0);

    return await qb.getManyAndCount();
  }

  public async findCarById(
    userData: IUserData,
    CarId: string,
  ): Promise<CarEntity> {
    const qb = this.createQueryBuilder('Car');
    qb.leftJoinAndSelect('Car.tags', 'tag');
    qb.leftJoinAndSelect('Car.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
    );

    qb.where('Car.id = :CarId');
    qb.setParameter('CarId', CarId);
    qb.setParameter('myId', userData.userId);

    return await qb.getOne();
  }
}
