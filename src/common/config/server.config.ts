import { registerAs } from '@nestjs/config';

interface ServerOptionsConfigInterface {
  env: string;
}

export const serverConfig = registerAs(
  'server',
  (): ServerOptionsConfigInterface => ({
    env: 'development',
  }),
);
