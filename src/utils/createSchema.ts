import { buildSchema } from "type-graphql";
import { ProductResolver } from "../modules/product/product-resolver";
import { PurchaseResolver } from "../modules/purchase/purchase-resolver";
import { StoreResolver } from "../modules/store/store-resolver";


export const createSchema = () => buildSchema({
    resolvers : [
        StoreResolver,
        ProductResolver,
        PurchaseResolver
    ]
})