import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Product";
import { Purchase } from "../../entity/Purchase";
import { Store } from "../../entity/Store";
import { formatMoney } from "../../utils/money";
import { PurchaseService } from "./service/purchase-service";

@Resolver(Purchase)
export class PurchaseResolver {

    constructor(
        private purchaseService = new PurchaseService(
            AppDataSource.getRepository(Store),
            AppDataSource.getRepository(Product),
            AppDataSource.getRepository(Purchase)
        )
    ) { }

    @Query(() => [Purchase])
    async allPurchases() {
        return await this.purchaseService.getAll();
    }

    @Mutation(() => Purchase)
    async purchase(
        @Arg('id') id: Number
    ): Promise<Purchase> {
        return await this.purchaseService.purchase(id);
    }

    @FieldResolver()
    async store(@Root() purchase: Purchase): Promise<Store> {
        return await this.purchaseService.getStore(purchase.getStoreId());
    }

    @FieldResolver(type => String)
    productPrice(@Root() purchase : Purchase){
        return formatMoney(purchase.getProductPrice())
    }

    @FieldResolver(type => String)
    storeAmount(@Root() purchase : Purchase){
        return formatMoney(purchase.getStoreAmout())
    }

    @FieldResolver(type => String)
    gatewayValue(@Root() purchase : Purchase){
        return formatMoney(purchase.getGatewayAmount())
    }

    @FieldResolver(type => String)
    marketplaceValue(@Root() purchase : Purchase){
        return formatMoney(purchase.getMarketplaceAmount())
    }


}