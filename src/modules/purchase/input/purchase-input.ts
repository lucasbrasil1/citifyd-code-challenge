import { Field, InputType } from "type-graphql";
import { Product } from "../../../entity/Product";
import { Store } from "../../../entity/Store";

@InputType()
export class PurchaseInput {
    @Field()
    productId: Number;

    @Field()
    storeId: Number;
}