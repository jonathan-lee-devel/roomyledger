import {Module} from '@nestjs/common';
import {RandomService} from '@rl-util/util/services/random.service';

@Module({
  providers: [RandomService],
  exports: [RandomService],
})
export class UtilModule {}
