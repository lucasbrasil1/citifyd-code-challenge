import { Length, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class StoreInput {
    @Field()
    @Length(1, 30)
    name: String

    @Field({nullable : true})
    @Min(1)
    @Max(20)
    totalFee: Number
}

@InputType()
export class StoreUpdate extends StoreInput {
    @Field({nullable : false})
    id: Number;

    @Field({nullable : true})
    @Length(1, 30)
    name: String

    @Field({nullable : true})
    @Min(1)
    @Max(20)
    totalFee: Number
}