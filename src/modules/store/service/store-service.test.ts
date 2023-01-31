import { Store } from "../../../entity/Store";
import { TestDataSource } from "../../../test-utils/test-data-source"
import { StoreService } from "./store-service";

jest.useFakeTimers();

describe('store service tests', () => {

    beforeAll(async () => {
        await TestDataSource.initialize().then(() => {

        }).catch(err => console.log(err));
    })


    const storeService = new StoreService(TestDataSource.getRepository(Store))

    it('should create a store', async () => {
        const created = await storeService.create({ name: "TestStore", totalFee: 15 });
        await storeService.get(created.id).then(store => {
            expect(created).toStrictEqual(store);
            expect(created.name).toBe(store.name)
            expect(created.id).toBe(store.id)
            expect(created.totalFee).toBe(store.totalFee)
        });

    })

    it('should update a store', async () => {
        await storeService.update({
            id: 1,
            name: "UpdatedStore",
            totalFee: 9
        });

        await storeService.get(1).then(result => {
            expect(result.id).toBe(1)
            expect(result.name).toBe("UpdatedStore")
            expect(result.totalFee).toBe(9)
        });

    })
})