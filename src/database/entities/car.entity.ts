import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.CAR })
export class CarEntity extends BaseModel {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  price: string;

  @Column('text')
  valute: string;

  @Column('text')
  locate: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

}
