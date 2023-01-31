import { Length, Min } from "class-validator";
import { Field, ID, InputType, Int } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    @Length(1, 30)
    name: String;

    @Field(type => Int)
    @Min(0)
    price: Number;

    @Field(Type => Int)
    storeId: Number;
}

@InputType()
export class ProductUpdate {
    @Field(() => ID)
    id : Number;

    @Field({ nullable : true })
    @Length(1, 30)
    name?: String;

    @Field(type => Int, { nullable : true })
    @Min(0)
    price?: Number;
}