import {Module} from '@nestjs/common';

import {PreferencesController} from './preferences/preferences.controller';
import {ProfileController} from './profile/profile.controller';

@Module({
  controllers: [PreferencesController, ProfileController],
})
export class UsersModule {}
