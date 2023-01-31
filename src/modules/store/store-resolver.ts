import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AppDataSource } from "../../data-source";
import { Store } from "../../entity/Store";
import { StoreInput, StoreUpdate } from "./input/store-inputs";
import { StoreService } from "./service/store-service";


@Resolver()
export class StoreResolver {

    constructor(
        private storeService = new StoreService(AppDataSource.getRepository(Store))
    ) {}

    @Query(() => [Store])
    async allStores() : Promise<Store[]> {
        return await this.storeService.getAll();
    }

    @Mutation(() => Store)
    async createStore(
        @Arg('data') data: StoreInput
    ): Promise<Store> {
        return await this.storeService.create(data);
    }

    @Mutation(() => Store)
    async updateStore(
        @Arg('data') data : StoreUpdate
    ) : Promise<Store> {
        return await this.storeService.update(data);
    }
}

