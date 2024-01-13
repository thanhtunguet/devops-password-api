import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordPayloadDto {
  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  password: string;

  @ApiProperty({
    type: String,
  })
  newPassword: string;
}
