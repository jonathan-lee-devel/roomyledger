import { join } from 'path';

export const getProtoPath = (protoFile: string) => {
  return process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
    ? `/app/proto/${protoFile}`
    : join(__dirname, `../proto/${protoFile}`);
};
