import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Code, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./Product";
import { Store } from "./Store";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: Number

    @Field(type => ID)
    @Column()
    private productId: Number

    @Field()
    @Column()
    private productName: String

    @Column()
    private productPrice: Number

    @Field(type => Store)
    @ManyToOne(() => Store)
    store: Store
    @RelationId((purchase: Purchase) => purchase.store)
    private storeId: Number

    @Column()
    private storeAmout: Number;

    @Column()
    private gatewayAmount: Number;

    @Column()
    private marketplaceAmount: Number;

    @Column()
    @Field()
    private feeAtTheTime : Number;

    getProductId() { return this.productId }
    getProductName() { return this.productName }
    getProductPrice() { return this.productPrice }
    getStoreId() { return this.storeId }
    getStoreAmout() { return this.storeAmout }
    getGatewayAmount() { return this.gatewayAmount }
    getMarketplaceAmount() { return this.marketplaceAmount }
    setProductId(productId: Number) { this.productId = productId }
    setProductName(productName: String) { this.productName = productName }
    setProductPrice(productPrice: Number) { this.productPrice = productPrice }
    setStoreId(storeId: Number) { this.storeId = storeId }
    setStoreAmout(storeAmout: Number) { this.storeAmout = storeAmout }
    setGatewayAmount(gatewayAmount: Number) { this.gatewayAmount = gatewayAmount }
    setMarketplaceAmount(marketplaceAmount: Number) { this.marketplaceAmount = marketplaceAmount }
    getFeeAtTheTime(): Number { return this.feeAtTheTime }
    setFeeAtTheTime(fee : Number) { this.feeAtTheTime = fee }
}