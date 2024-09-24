import {Test, TestingModule} from '@nestjs/testing';

import {RlMicroLedgersController} from './rl-micro-ledgers.controller';
import {RlMicroLedgersService} from './rl-micro-ledgers.service';

describe('RlMicroLedgersController', () => {
  let rlMicroLedgersController: RlMicroLedgersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RlMicroLedgersController],
      providers: [RlMicroLedgersService],
    }).compile();

    rlMicroLedgersController = app.get<RlMicroLedgersController>(
      RlMicroLedgersController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rlMicroLedgersController.getHello()).toBe('Hello World!');
    });
  });
});
