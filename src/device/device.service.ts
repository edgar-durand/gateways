import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, getRepository, ObjectID, Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { IResponse } from '../interfaces/api-interfaces';
import { mapFromDto } from '../helpers/entity-utils';
import { responseToInterface } from '../helpers/return-utils';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entity/device.entity';
import { Gateway } from '../gateway/entity/gateway.entity';

@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>
  ) {
  }

  /**
   * Create new device
   *
   * @param gatewayId
   * @param createDeviceDTO
   */
  async create(gatewayId: ObjectID, createDeviceDTO: CreateDeviceDto): Promise<IResponse> {
    const gatewayRepository = getRepository(Gateway);

    try {
      const gateway = await gatewayRepository.findOne(gatewayId);
      if (!gateway) throw new NotFoundException({ message: 'Device Not Found' });
      if (gateway.devices?.length === 10) throw new UnprocessableEntityException({ message: 'Max number of devices exceeded' });

      const device = new Device();
      mapFromDto(device, createDeviceDTO);

      const manager = getMongoManager();
      const { _id } = await manager.save(device);

      gateway.devices.push(_id.toString());
      await manager.save(gateway);

      return responseToInterface({ _id });
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * List all Devices
   */
  async list(): Promise<IResponse> {
    try {
      const devices = await this.deviceRepository.find();
      return responseToInterface(devices);
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Update one device
   *
   * @param id
   * @param updateDTO
   */
  async update(id: ObjectID, updateDTO: UpdateDeviceDto): Promise<IResponse> {
    try {
      const manager = getMongoManager();
      const currentDevice = await this.findByUID(id);
      if (!currentDevice) throw new BadRequestException({ message: 'Device Not Found' });

      mapFromDto(currentDevice, updateDTO);
      await manager.save(currentDevice);

      return responseToInterface();
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Delete device by Id
   *
   * @param id
   */
  async delete(id: ObjectID): Promise<IResponse> {
    try {
      const device = await this.findByUID(id);
      if (!device) throw new BadRequestException({ message: 'Device Not Found' });

      await this.deviceRepository.delete(device._id);
      return responseToInterface({}, true, `Device deleted successfully.`);
    } catch (e) {
      return responseToInterface({}, false, e.message);
    }
  }

  /**
   * Find device by UID
   *
   * @param deviceUID
   */
  async findByUID(deviceUID: ObjectID): Promise<Device | null> {
    try {
      return this.deviceRepository.findOne(deviceUID);
    } catch (e) {
      return null;
    }
  }
}
