import {join} from 'path';

export const getProtoPath = (protoPackageName: string) => {
  return join(__dirname, `../proto/${protoPackageName}.proto`);
};

export const boostrapErrorHandler = (error: Error) => console.error(error);
