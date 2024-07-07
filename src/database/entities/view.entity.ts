import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.VIEWS })
export class ViewEntity extends BaseModel {

}
