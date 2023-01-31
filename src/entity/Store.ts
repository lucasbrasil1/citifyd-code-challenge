import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Product } from "./Product"

@ObjectType()
@Entity()
export class Store extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: Number

    @Field()
    @Column({ unique: true })
    name: String

    @Field({ defaultValue: 10 })
    @Column({ default: 10 })
    totalFee: Number

    @Field(type => [Product])
    @OneToMany(() => Product, product => product.store)
    products: Promise<Product[]>;
}
