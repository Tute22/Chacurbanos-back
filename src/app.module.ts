import { Module } from '@nestjs/common';
import { UsersModule } from './routes/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
