import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateway } from './entity/gateway.entity';
import { Device } from '../device/entity/device.entity';
import { DeviceService } from '../device/device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gateway, Device]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, DeviceService],
  exports: [GatewayService]
})
export class GatewayModule {}
