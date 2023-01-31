import { Equal, Repository } from "typeorm";
import { Store } from "../../../entity/Store";
import { StoreInput, StoreUpdate } from "../input/store-inputs";

export class StoreService {

    constructor(
        private readonly storeRepository: Repository<Store>
    ) { }

    async getAll(): Promise<Store[]> {
        return await this.storeRepository.find();
    }

    async get(id: Number): Promise<Store> {
        return await this.storeRepository.findOneBy({ id: Equal(id) })
    }

    async create({ name, totalFee }: StoreInput): Promise<Store> {
        const store = await Store.create({
            name,
            totalFee
        }).save();

        return store;
    }

    async update({ id, name, totalFee }: StoreUpdate): Promise<Store> {
        if (!name && !totalFee) { throw new Error("No values have been changed!") }

        const storeToUpdate = await this.storeRepository.findOneBy({ id: Equal(id) })
        if (storeToUpdate === null) { throw new Error("Store Id Not Found!") }
 
        if (name) storeToUpdate.name = name;
        if (totalFee) storeToUpdate.totalFee = totalFee;
       
        return  await storeToUpdate.save();;
    }

}