import { ApiProperty } from '@nestjs/swagger';

enum ChangePasswordResponseDtoStatus {
  success = 'success',
  error = 'error',
}

export class ChangePasswordResponseDto {
  @ApiProperty({
    type: ChangePasswordResponseDtoStatus,
    enum: ChangePasswordResponseDtoStatus,
  })
  status: ChangePasswordResponseDtoStatus;

  @ApiProperty({
    type: String,
  })
  message?: string;
}
