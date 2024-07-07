import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarResDto } from '../dto/res/car.res.dto';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    return {
      id: entity.id,
      brand: entity.brand,
      model: entity.model,
      price: entity.price,
      valute: entity.valute,
      locate: entity.locate,
      description: entity.description,
      body: entity.body,
      created: entity.created,
      updated: entity.updated,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
    };
  }
}
