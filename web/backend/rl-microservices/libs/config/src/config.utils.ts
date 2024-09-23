import { join } from 'path';

export const getProtoPath = (protoFile: string) => {
  return process.env.NODE_ENV === 'production'
    ? `/app/dist/apps/proto/${protoFile}`
    : join(__dirname, `../proto/${protoFile}`);
};
