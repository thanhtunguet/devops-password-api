import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { ChangePasswordPayloadDto } from './dtos/change-password-payload.dto';
import { ChangePasswordResponseDto } from './dtos/change-password-response.dto';
import { NtlmForm } from './dtos/ntlm-form.dto';
import { DevopsUser } from './models/user';

@ApiTags('Password')
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {
    //
  }

  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({
    type: ChangePasswordPayloadDto,
  })
  @ApiResponse({
    type: ChangePasswordResponseDto,
    status: 200,
    description: 'Success',
  })
  @Post('/change-password')
  async changePassword(
    @Body() body: ChangePasswordPayloadDto,
    @Res() response: Response,
  ): Promise<string> {
    const { username, password, newPassword } = body;
    try {
      const user = await this.appService.authenticate(username, password);

      if (user.identity.AccountName.toLowerCase() === username.toLowerCase()) {
        try {
          const logs = await this.appService.changeWindowsPassword(
            username,
            newPassword,
          );
          response.status(200).send(logs);
        } catch (passwordError) {
          response.status(400).send(passwordError);
        }
        return;
      }
      response.status(400).send('Account name mismatch');
    } catch (error) {
      response.status(400).send("Invalid user's credentials");
    }
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiProduces('application/json')
  @ApiBody({
    type: NtlmForm,
  })
  @Post('/ntlm')
  async testNtlm(@Body() body: NtlmForm): Promise<DevopsUser> {
    if (process.env.NODE_ENV !== 'production') {
      const { username, password } = body;
      return this.appService.authenticate(username, password);
    }

    throw new Error('API Not Implemented');
  }
}
