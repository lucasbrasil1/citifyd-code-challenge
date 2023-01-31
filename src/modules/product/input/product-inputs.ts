import { Length, Min } from "class-validator";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    @Length(1, 30)
    name: string;

    @Field(Int)
    @Min(0)
    price: number;

    @Field(Type => Int)
    storeId: number;
}

@InputType()
export class ProductUpdate {
    @Field(() => ID)
    id : number;

    @Field({ nullable : true })
    @Length(1, 30)
    name?: string;

    @Field(() => Int, { nullable : true })
    @Min(0)
    price?: number;
}