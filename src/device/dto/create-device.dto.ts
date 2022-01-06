import { ApiProperty } from '@nestjs/swagger';


export class CreateDeviceDto {
  @ApiProperty({
    description: 'The vendor of device',
    example: 'Gigabyte',
  })
  vendor: string;

  @ApiProperty({
    description: 'The device status',
    example: 'on-line'
  })
  status: 'on-line' | 'off-line';
}
