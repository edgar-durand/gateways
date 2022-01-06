import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IPv4Interface } from '../../interfaces/api-interfaces';

@Entity()
export class Gateway extends BaseEntity {

  @ApiProperty({
    description: 'The name of gateway',
    example: 'Nodo1',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Gateway IPv4',
    example: { isValid: true, IPv4: '127.0.0.1' },
  })
  @Column({ nullable: true, name: 'IPv4' })
  IPv4: IPv4Interface;

  @ApiProperty({
    description: 'Devices that belongs to this gateway'
  })
  @Column({ default: [] })
  devices: string[];
}
