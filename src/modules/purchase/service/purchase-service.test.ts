import { Product } from "../../../entity/Product";
import { Purchase } from "../../../entity/Purchase";
import { Store } from "../../../entity/Store";
import { TestDataSource } from "../../../test-utils/test-data-source"
import { IAmounts, PurchaseService } from "./purchase-service";
import { faker } from "@faker-js/faker"
import { money } from "../../../utils/money";


describe('create purchase test', () => {

    beforeAll(async () => {
        await TestDataSource.initialize().then(async () => {

        }).catch(err => console.log(err));
    })

    const purchaseService = new PurchaseService(
        TestDataSource.getRepository(Store),
        TestDataSource.getRepository(Product),
        TestDataSource.getRepository(Purchase)
    );

    it('should create a valid random product', async () => {

        const randomPrice = faker.commerce.price(100, 9999999, 0);
        const randomFee = faker.random.numeric();

        await createFakeStore(null, randomFee).then(async store => {

            const gatewayFee = 1;
            const marketplaceFee = Number(randomFee) - gatewayFee;
            const gatewayValue = money(randomPrice).percentage(gatewayFee);
            const marketplaceValue = money(randomPrice).percentage(marketplaceFee)
            const storeValue = money(randomPrice).subtract(gatewayValue.add(marketplaceValue))
            const expectedResult: IAmounts = {
                gateway: gatewayValue.getAmount(),
                marketplace: marketplaceValue.getAmount(),
                store: storeValue.getAmount()
            }

            await createFakeProduct(store, null, Number(randomPrice)).then(async product => {
                await purchaseService.purchase(product.id).then(purchase => {
                    expect(purchase.getGatewayAmount()).toBe(expectedResult.gateway)
                    expect(purchase.getMarketplaceAmount()).toBe(expectedResult.marketplace)
                    expect(purchase.getStoreAmout()).toBe(expectedResult.store)
                    expect(purchase.getProductPrice()).toBe(Number(randomPrice))
                    expect(purchase.getFeeAtTheTime()).toBe(Number(randomFee));
                }).catch(error => console.log("Purchase error: ", error));
            }).catch(error => console.log("Product error: ", error));
        }).catch(error => console.log("Store error: ", error))
    })

    it('should create a valid product with fixed values', async () => {
        const fixedFee = 6;
        const fixedPrice = 7490286;
        await createFakeStore(null, fixedFee).then(async store => {

            const expectedResult: IAmounts = {
                gateway: 74903,
                marketplace: 374514,
                store: 7040869
            }

            await createFakeProduct(store, "Fixed Hat", Number(fixedPrice)).then(async product => {
                await purchaseService.purchase(product.id).then(purchase => {
                    expect(purchase.getGatewayAmount()).toBe(expectedResult.gateway)
                    expect(purchase.getMarketplaceAmount()).toBe(expectedResult.marketplace)
                    expect(purchase.getStoreAmout()).toBe(expectedResult.store)
                    expect(purchase.getProductPrice()).toBe(Number(fixedPrice))
                    expect(purchase.getProductName()).toBe("Fixed Hat")
                    expect(purchase.getFeeAtTheTime()).toBe(6)
                }).catch(error => console.log("Purchase error: ", error));
            }).catch(error => console.log("Product error: ", error));
        }).catch(error => console.log("Store error: ", error))
    })

    it('should get all purchases', async () => {
        clearDatabase();

        await createFakeStore().then(async store => {
            await createFakeProduct(store).then(async product => {
                await purchaseService.purchase(product.id).then(async () => {
                    await purchaseService.getAll().then(all =>
                        expect(all.length).toBe(1)
                    );
                });
            })
        })
        
    })

    it('should get one purchase', async () => {
        clearDatabase();

        await createFakeStore(null, 17).then(async store => {
            await createFakeProduct(store, null, 202020).then(async product => {
                await purchaseService.purchase(product.id).then(async purchase => {
                    await purchaseService.get(purchase.id).then(async purchase => {
                        expect(purchase.getProductName()).toBe(product.getName());
                        expect(purchase.getStoreAmout()).toBe(167677)
                        expect(purchase.getGatewayAmount()).toBe(2020)
                        expect(purchase.getMarketplaceAmount()).toBe(32323)
                        expect(purchase.getFeeAtTheTime()).toBe(17)
                    })
                })
            })
        })
    })

    it('should get the related product', async () => {
        clearDatabase();

        await createFakeStore(null).then(async store => {
            await createFakeProduct(store, "ProductTest202020", 202020).then(async product => {
                await purchaseService.purchase(product.id).then(async purchase => {
                    await purchaseService.getProduct(purchase.getProductId()).then(async product => {
                        expect(product.getName()).toBe("ProductTest202020")
                        expect(product.getPrice()).toBe(202020)
                        expect(product.getStoreId()).toBe(store.id)
                    })
                })
            })
        })
    })

    it('should get the related store', async () => {
        clearDatabase();

        await createFakeStore("LAStoreTest", 20).then(async store => {
            await createFakeProduct(store, null, 202020).then(async product => {
                await purchaseService.purchase(product.id).then(async purchase => {
                    await purchaseService.getStore(purchase.getStoreId()).then(async store => {
                        expect(store.name).toBe("LAStoreTest")
                        expect(store.totalFee).toBe(20)
                    })
                })
            })
        })
    })
})

function createFakeStore(name?: string, fee?: number | string) {
    return Store.create({
        name: name ? name : faker.company.name(),
        totalFee: fee ? Number(fee) : 10
    }).save();
}

function createFakeProduct(store: Store, name?: string, price?: number) {
    return Product.create({
        name: name ? name : faker.commerce.product(),
        price: price ? price : Number(faker.random.numeric(5)),
        store: store
    }).save();
}

function clearDatabase() {
    TestDataSource.getRepository(Purchase).clear()
    TestDataSource.getRepository(Product).clear()
    TestDataSource.getRepository(Store).clear()
}