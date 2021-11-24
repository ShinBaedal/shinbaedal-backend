import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOption } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connectionOption,
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
