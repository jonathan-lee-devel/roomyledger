import { Test, TestingModule } from '@nestjs/testing';
import { RlMicroCommsController } from './rl-micro-comms.controller';
import { RlMicroCommsService } from './rl-micro-comms.service';

describe('RlMicroCommsController', () => {
  let rlMicroCommsController: RlMicroCommsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RlMicroCommsController],
      providers: [RlMicroCommsService],
    }).compile();

    rlMicroCommsController = app.get<RlMicroCommsController>(RlMicroCommsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rlMicroCommsController.getHello()).toBe('Hello World!');
    });
  });
});
