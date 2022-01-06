import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Device extends BaseEntity {

  @ApiProperty({
    description: 'The vendor of device',
    example: 'Gigabyte',
  })
  @Column()
  vendor: string;

  @ApiProperty({
    description: 'The device status',
    example: 'on-line'
  })
  @Column()
  status: 'on-line' | 'off-line';
}
