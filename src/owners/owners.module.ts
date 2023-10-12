import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnersResolver, OwnersService],
  exports: [OwnersService], // allow pets module to query for owner fields
})
export class OwnersModule {}
