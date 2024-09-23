import { join } from 'path';

export const getProtoPath = (protoFile: string) => {
  return process.env.NODE_ENV === 'production'
    ? `dist/apps/proto/${protoFile}`
    : join(__dirname, `../proto/${protoFile}`);
};
