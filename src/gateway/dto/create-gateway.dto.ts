import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPv4Interface } from '../../interfaces/api-interfaces';


export class CreateGatewayDto {
  @IsDefined()
  @ApiProperty({
    description: 'The name of gateway',
    example: 'Nodo 1',
  })
  name: string;

  @IsDefined()
  @ApiProperty({
    description: 'Gateway IPv4',
    example: { isValid: true, IPv4: '127.0.0.1' },
  })
  IPv4: IPv4Interface;

}
