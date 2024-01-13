import { Injectable } from '@nestjs/common';
import { DevopsUser } from './models/user';
import { DEVOPS_DOMAIN, DEVOPS_URL } from './config/consts';
import { NtlmClient, NtlmCredentials } from 'axios-ntlm';
import { exec } from 'child_process';

interface IAppService {
  authenticate(username: string, password: string): Promise<DevopsUser>;

  changeWindowsPassword(username: string, newPassword: string): Promise<string>;
}

@Injectable()
export class AppService implements IAppService {
  public async authenticate(
    username: string,
    password: string,
  ): Promise<DevopsUser> {
    const url = new URL('_api/_common/GetUserProfile?__v=5', DEVOPS_URL).href;

    return new Promise<DevopsUser>(async (resolve, reject) => {
      const credentials: NtlmCredentials = {
        username,
        password,
        domain: DEVOPS_DOMAIN,
      };

      const client = NtlmClient(credentials);

      try {
        const resp = await client({
          url,
          method: 'get',
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public changeWindowsPassword(
    username: string,
    newPassword: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Command to change the password
      const cmd = `net user ${username} ${newPassword}`;

      // Execute the command
      exec(
        cmd,
        { shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/bash' },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            reject(stderr);
            return;
          }
          console.log(
            `Password for ${username} has been changed successfully.`,
          );
          resolve(stdout);
        },
      );
    });
  }
}
