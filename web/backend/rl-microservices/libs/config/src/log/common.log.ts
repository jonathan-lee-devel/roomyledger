import {Logger} from '@nestjs/common';

export const logMicroServiceListenStart = (
  logger: Logger,
  serviceName: string,
  listenAddress: string,
  listenPort: string,
) => {
  logger.log(`${serviceName} listening on ${listenAddress}:${listenPort}`);
};
