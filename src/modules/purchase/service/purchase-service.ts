import { Equal, Repository } from "typeorm";
import { Product } from "../../../entity/Product";
import { Purchase } from "../../../entity/Purchase";
import { Store } from "../../../entity/Store";
import { money } from "../../../utils/money";

const GATEWAY_FEE = 1;

export interface IAmounts {
    gateway: number
    marketplace: number
    store: number
}

export class PurchaseService {

    constructor(
        private readonly storeRepository: Repository<Store>,
        private readonly productRepository: Repository<Product>,
        private readonly purchaseRepository: Repository<Purchase>
    ) { }

    async getAll(): Promise<Purchase[]> {
        return await this.purchaseRepository.find();
    }

    async get(id: number): Promise<Purchase> {
        return await this.purchaseRepository.findOneBy({ id: Equal(id) });
    }

    async purchase(id: number): Promise<Purchase> {
        const product = await this.getProduct(id);
        if (!product) { throw new Error("Product Id Not Found!") }
        return await this.createPurchase(product);
    }

    async getProduct(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id: Equal(id) }, cache: 1000 })
    }
    async getStore(id: number): Promise<Store> {
        return await this.storeRepository.findOne({ where: { id: Equal(id) }, cache: 1000 })
    }

    private async createPurchase(product: Product): Promise<Purchase> {
        const purchase = new Purchase();
        const store = await this.getStore(product.getStoreId())
        if (!store) { throw new Error("Store Id Not Found!") }

        const amount : IAmounts = this.calculateAmounts(product.getPrice(), store.totalFee);

        this.setPurchaseValues(
            purchase, 
            store, 
            product, 
            amount);

    
        return await purchase.save();
    }

    private calculateAmounts(price : number, fee : number) : IAmounts {
        const gatewayMoney = money(price).percentage(GATEWAY_FEE);
        const marketplaceMoney = money(price).percentage(Number(fee) - GATEWAY_FEE);
        const storeMoney = money(price).subtract(gatewayMoney.add(marketplaceMoney));
        const amounts : IAmounts = {
            gateway : gatewayMoney.getAmount(),
            marketplace : marketplaceMoney.getAmount(),
            store : storeMoney.getAmount()
        }
        return amounts;
    }

    private setPurchaseValues(purchase: Purchase, store: Store, product: Product, amount : IAmounts) {
        purchase.store = store;
        purchase.setProductId(product.id)
        purchase.setProductName(product.getName())
        purchase.setProductPrice(product.getPrice())
        purchase.setGatewayAmount(amount.gateway)
        purchase.setMarketplaceAmount(amount.marketplace)
        purchase.setStoreAmout(amount.store)
        purchase.setFeeAtTheTime(store.totalFee)
    }




}

