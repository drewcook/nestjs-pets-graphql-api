import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver((of) => Pet) // 'of' keyword allows resolving nested fields
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  // Allow to get Owner fields in a Pet query for a custom stitched query
  // Nested field resolver
  /*
		pets {
			id
			name
			owner { <- resolves this
				name
			}
		}
	*/
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Mutation((returns) => Pet)
  createPet(@Args('createPetInput') input: CreatePetInput): Promise<Pet> {
    return this.petsService.createPet(input);
  }
}
