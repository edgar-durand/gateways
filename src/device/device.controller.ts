import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceService } from './device.service';
import { IResponse } from '../interfaces/api-interfaces';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(
    private deviceService: DeviceService
  ) { }

  @ApiOperation({
    summary: 'Create device',
    description: 'Create one device.'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        result: true,
        data: { uid: 1 },
        message: 'success'
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Error-Response',
    schema: {
      example: {
        'result': false,
        'message': 'Error message'
      }
    }
  })
  @ApiParam({
    name: 'gatewayId',
    description: 'the gateway ID where it to belongs',
  })
  @Post(':gatewayId')
  create(
    @Body() createDTO: CreateDeviceDto,
    @Param('gatewayId')gatewayId
  ): Promise<IResponse> {
    return this.deviceService.create(gatewayId, createDTO);
  }

  @ApiOperation({
    summary: 'Delete Device',
    description: 'Delete one device from database'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        'result': true,
        'message': 'success message'
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Error-Response',
    schema: {
      example: {
        'result': false,
        'message': 'Error text'
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Device Id',
    required: true
  })
  @Delete(':id')
  delete(@Param('id')id): Promise<IResponse> {
    return this.deviceService.delete(id);
  }

  @ApiOperation({
    summary: 'Update Device',
    description: 'Update one device by UID'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        'result': true,
        'message': 'success message'
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Error-Response',
    schema: {
      example: {
        'result': false,
        'message': 'Error text'
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Device UID',
    required: true
  })
  @Put(':id')
  async update(
    @Param('id')id,
    @Body() update: UpdateDeviceDto
  ): Promise<IResponse> {
      return this.deviceService.update(id, update);
  }

  @ApiOperation({
    summary: 'List devices',
    description: 'Returns the list of all devices'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        result: true,
        data: []
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Error-Response',
    schema: {
      example: {
        'result': false,
        'message': 'Error message'
      }
    }
  })
  @Get()
  list(): Promise<IResponse> {
    return this.deviceService.list();
  }
}
