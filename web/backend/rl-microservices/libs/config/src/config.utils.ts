import {join} from 'path';

export const getProtoPath = (protoPackageName: string) => {
  return join(__dirname, `../proto/${protoPackageName}.proto`);
};
