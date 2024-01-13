import { Repository } from 'react3l';
import { DEVOPS_URL } from 'src/config/consts';

export class DevopsRepository extends Repository {
  constructor() {
    super({});
    this.baseURL = DEVOPS_URL;
  }
}

export const devopsRepository = new DevopsRepository();
