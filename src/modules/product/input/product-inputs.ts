import { Length, Min } from "class-validator";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    @Length(1, 30)
    name: string;

    @Field(_Type => Int)
    @Min(0)
    price: number;

    @Field(_Type => Int)
    storeId: number;
}

@InputType()
export class ProductUpdate {
    @Field(_Type => ID)
    id : number;

    @Field({ nullable : true })
    @Length(1, 30)
    name?: string;

    @Field(_Type => Int, { nullable : true })
    @Min(0)
    price?: number;
}