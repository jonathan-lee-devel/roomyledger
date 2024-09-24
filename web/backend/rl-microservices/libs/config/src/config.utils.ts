import { join } from 'path';

export const getProtoPath = (protoFile: string) => {
  return join(__dirname, `../proto/${protoFile}`);
};
