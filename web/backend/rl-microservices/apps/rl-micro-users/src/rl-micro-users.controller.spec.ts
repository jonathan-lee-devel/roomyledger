import { Test, TestingModule } from '@nestjs/testing';
import { RlMicroUsersController } from './rl-micro-users.controller';
import { RlMicroUsersService } from './rl-micro-users.service';

describe('RlMicroUsersController', () => {
  let rlMicroUsersController: RlMicroUsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RlMicroUsersController],
      providers: [RlMicroUsersService],
    }).compile();

    rlMicroUsersController = app.get<RlMicroUsersController>(RlMicroUsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rlMicroUsersController.getHello()).toBe('Hello World!');
    });
  });
});
