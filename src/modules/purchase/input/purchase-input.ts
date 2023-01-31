import { Field, InputType } from "type-graphql";

@InputType()
export class PurchaseInput {
    @Field()
    productId: number;

    @Field()
    storeId: number;
}