import {Test, TestingModule} from '@nestjs/testing';

import {RlMicroApiGatewayController} from './rl-micro-api-gateway.controller';
import {RlMicroApiGatewayService} from './rl-micro-api-gateway.service';

describe('RlMicroApiGatewayController', () => {
  let rlMicroApiGatewayController: RlMicroApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RlMicroApiGatewayController],
      providers: [RlMicroApiGatewayService],
    }).compile();

    rlMicroApiGatewayController = app.get<RlMicroApiGatewayController>(
      RlMicroApiGatewayController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rlMicroApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
