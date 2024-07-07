import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarService } from './services/car.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../common/decorators/api-file.decorator';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  //нецензурна лексика
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.create(userData, dto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  // перехоплює файл з req
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('image', false)
  @Post('car/image')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.carService.uploadImage(userData, image);
  }



  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: any,
  ): Promise<any> {
    return await this.carService.getList(userData, query);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':carId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
  ): Promise<CarResDto> {
    return await this.carService.getById(userData, carId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Put(':carId')
  public async updateById(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
    @Body() dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.updateById(userData, carId, dto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':carId')
  public async deleteById(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
  ): Promise<void> {
    await this.carService.deleteById(userData, carId);
  }
}
