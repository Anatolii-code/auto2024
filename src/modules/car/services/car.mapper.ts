import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarResDto } from '../dto/res/car.res.dto';
import { ConfigStaticService } from '../../../configs/config.static';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    const awsConfig = ConfigStaticService.get().aws;
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
      file: entity.file ? `${awsConfig.bucketUrl}/${entity.file}` : null,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
    };
  }
}
