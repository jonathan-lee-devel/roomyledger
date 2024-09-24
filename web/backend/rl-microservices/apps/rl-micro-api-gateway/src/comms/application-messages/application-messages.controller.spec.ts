import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationMessagesController } from './application-messages.controller';

describe('ApplicationMessagesController', () => {
  let controller: ApplicationMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationMessagesController],
    }).compile();

    controller = module.get<ApplicationMessagesController>(ApplicationMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
