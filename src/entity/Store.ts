import { Field, ID, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Product } from "./Product"

@ObjectType()
@Entity()
export class Store extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @Field({ defaultValue: 10 })
    @Column({ default: 10 })
    totalFee: number

    @Field(() => [Product])
    @OneToMany(() => Product, product => product.store)
    products: Promise<Product[]>;
}
