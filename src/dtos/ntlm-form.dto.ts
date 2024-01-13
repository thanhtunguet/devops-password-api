import { ApiProperty } from '@nestjs/swagger';

export class NtlmForm {
  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}
