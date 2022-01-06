import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entity/device.entity';
import { Gateway } from '../gateway/entity/gateway.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device, Gateway]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule {}
