import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, ObjectID, Repository } from 'typeorm';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { IResponse } from '../interfaces/api-interfaces';
import { mapFromDto } from '../helpers/entity-utils';
import { responseToInterface } from '../helpers/return-utils';
import { Gateway } from './entity/gateway.entity';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { DeviceService } from '../device/device.service';
import { Device } from '../device/entity/device.entity';

@Injectable()
export class GatewayService {

  constructor(
    @InjectRepository(Gateway)
    private gatewayRepository: Repository<Gateway>,
    private deviceService: DeviceService,
  ) {
  }

  /**
   * Create new gateway
   *
   * @param createGatewayDTO
   */
  async create(createGatewayDTO: CreateGatewayDto): Promise<IResponse> {
    const manager = getMongoManager();
    try {
      const gateway = new Gateway();
      mapFromDto(gateway, createGatewayDTO);
      gateway.devices = [];
      const newGateway = await manager.save(gateway);
      return responseToInterface({ _id: newGateway._id });
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * List all Gateways
   */
  async list(): Promise<IResponse> {
    try {
      const gateways = await this.gatewayRepository.find({ select: ['_id', 'name', 'IPv4', 'createdAt'] });
      if (!gateways.length) throw new Error('Not Gateways Found');
      return responseToInterface(gateways);
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Get one gateway
   *
   * @param id
   */
  async getOne(id: ObjectID): Promise<IResponse> {
    try {
      const gateway = await this.gatewayRepository.findOne(id);
      if (!gateway) throw new NotFoundException({ message: 'Gateway not found' });

      const promises = gateway.devices.map( async (uid: any) => this.deviceService.findByUID(uid));
      const devices: Device[] = await Promise.all(promises);
      gateway.devices = devices as any[];

      return responseToInterface(gateway)
    }catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Update one gateway
   *
   * @param id
   * @param updateDTO
   */
  async update(id: ObjectID, updateDTO: UpdateGatewayDto): Promise<IResponse> {
    try {
      const manager = getMongoManager();
      const currentGateway = await this.findById(id);
      if (!currentGateway)
        throw new BadRequestException({ message: 'Gateway Not Found' });

      mapFromDto(currentGateway, updateDTO);
      await manager.save(currentGateway);
      return responseToInterface();
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Delete gateway by Id
   *
   * @param id
   */
  async delete(id: ObjectID): Promise<IResponse> {
    try {
      const gateway = await this.gatewayRepository.findOne(id);
      if (gateway) {
        await this.gatewayRepository.delete(id);
        return responseToInterface(
          {}, true, `Gateway ${id} deleted successfully.`,
        );
      }
      return responseToInterface(
        {}, true, 'The gateway id not found in database',
      );
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Find gateway by Id
   *
   * @param gatewayId
   */
  async findById(gatewayId: ObjectID): Promise<Gateway | null> {
    try {
      return this.gatewayRepository.findOne(gatewayId);
    } catch (e) {
      return null;
    }
  }
}
