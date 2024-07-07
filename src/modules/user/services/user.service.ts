import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  public async getProfile(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDTO(user);
  }

  public async updateProfile(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const updatedUser = await this.userRepository.save({ ...user, ...dto });
    return UserMapper.toResponseDTO(updatedUser);
  }

  public async getById(userId: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toResponseDTO(user);
  }

  public async remove(userId: string): Promise<void> {}

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }
}
