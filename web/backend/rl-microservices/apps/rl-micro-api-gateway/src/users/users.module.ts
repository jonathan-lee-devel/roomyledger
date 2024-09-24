import {Logger, Module} from '@nestjs/common';

import {PreferencesController} from './preferences/preferences.controller';
import {ProfileController} from './profile/profile.controller';

@Module({
  controllers: [PreferencesController, ProfileController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(UsersModule.name),
    },
  ],
})
export class UsersModule {}
