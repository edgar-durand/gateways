import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { GatewayService } from './gateway.service';
import { IResponse } from '../interfaces/api-interfaces';
import { UpdateGatewayDto } from './dto/update-gateway.dto';

@ApiTags('Gateway')
@Controller('gateway')
export class GatewayController {
  constructor(
    private gatewayService: GatewayService
  ) { }

  @ApiOperation({
    summary: 'Create gateway',
    description: 'Create one gateway.'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        result: true,
        data: { _id: '6160f5a9186609045c989652' }
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
  @Post()
  create(@Body() createDTO: CreateGatewayDto): Promise<IResponse> {
    return this.gatewayService.create(createDTO);
  }

  @ApiOperation({
    summary: 'Delete Gateway',
    description: 'Delete one gateway from database'
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
    description: 'Gateway Id',
    required: true
  })
  @Delete(':id')
  delete(@Param('id')id): Promise<IResponse> {
    return this.gatewayService.delete(id);
  }

  @ApiOperation({
    summary: 'Update Gateway',
    description: 'Update one gateway by Id.'
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
    description: 'Gateway Id',
    required: true
  })
  @Put(':id')
  async update(
    @Param('id')id,
    @Body() update: UpdateGatewayDto
  ): Promise<IResponse> {
      return this.gatewayService.update(id, update);
  }

  @ApiOperation({
    summary: 'List gateways',
    description: 'Returns the list of all gateways.'
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
    return this.gatewayService.list();
  }

  @ApiOperation({
    summary: 'Get by id',
    description: 'Get One gateway by id'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        result: true,
        data: {}
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
    name: 'id',
    description: 'gateway ID',
  })
  @Get(':id')
  findOne(@Param('id')id): Promise<IResponse> {
    return this.gatewayService.getOne(id);
  }
}
