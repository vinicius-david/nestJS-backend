import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { serverConfig } from './common/config/server.config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject(serverConfig.KEY)
    private config: ConfigType<typeof serverConfig>,
  ) {}
  getHello(): string {
    return this.config.env;
  }
}
