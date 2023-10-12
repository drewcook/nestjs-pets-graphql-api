import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), OwnersModule],
  providers: [PetsService, PetsResolver],
  exports: [PetsService], // allow owners module to query for their pets
})
export class PetsModule {}
