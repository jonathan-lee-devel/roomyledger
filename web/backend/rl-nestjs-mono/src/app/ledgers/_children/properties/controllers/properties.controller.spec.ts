import {TestBed} from '@automock/jest';
import {faker} from '@faker-js/faker';
import {User} from '@supabase/supabase-js';

import {PropertiesController} from './properties.controller';
import {CreatePropertyDto} from '../dto/create-property.dto';
import {PropertiesService} from '../services/properties.service';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let mockPropertiesService: jest.Mocked<PropertiesService>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(PropertiesController).compile();
    controller = unit;

    mockPropertiesService = unitRef.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockPropertiesService).toBeDefined();
  });

  it('should call create method on service when create method invoked', async () => {
    const requestingUserEmail = faker.internet.email();
    const createPropertyDto: CreatePropertyDto = {
      name: faker.internet.displayName(),
      addSelfAsTenant: true,
    };

    await controller.create(
      {email: requestingUserEmail} as User,
      createPropertyDto,
    );

    expect(mockPropertiesService.create).toHaveBeenCalledWith(
      requestingUserEmail,
      createPropertyDto,
    );
  });
});
