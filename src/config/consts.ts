import { config } from 'dotenv';

config();

export const DEVOPS_URL = process.env.DEVOPS_URL;

if (!DEVOPS_URL) {
  throw new Error('DEVOPS_URL is not defined');
}

export const DEVOPS_DOMAIN = process.env.DEVOPS_DOMAIN ?? 'DEVOPS';

export const NODE_ENV = process.env.NODE_ENV ?? 'production';
