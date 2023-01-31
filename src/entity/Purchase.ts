import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Code, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./Product";
import { Store } from "./Store";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(type => ID)
    @Column()
    private productId: number

    @Field()
    @Column()
    private productName: string

    @Column()
    private productPrice: number

    @Field(type => Store)
    @ManyToOne(() => Store)
    store: Store
    @RelationId((purchase: Purchase) => purchase.store)
    private storeId: number

    @Column()
    private storeAmout: number;

    @Column()
    private gatewayAmount: number;

    @Column()
    private marketplaceAmount: number;

    @Column()
    @Field()
    private feeAtTheTime : number;

    getProductId() { return this.productId }
    getProductName() { return this.productName }
    getProductPrice() { return this.productPrice }
    getStoreId() { return this.storeId }
    getStoreAmout() { return this.storeAmout }
    getGatewayAmount() { return this.gatewayAmount }
    getMarketplaceAmount() { return this.marketplaceAmount }
    setProductId(productId: number) { this.productId = productId }
    setProductName(productName: string) { this.productName = productName }
    setProductPrice(productPrice: number) { this.productPrice = productPrice }
    setStoreId(storeId: number) { this.storeId = storeId }
    setStoreAmout(storeAmout: number) { this.storeAmout = storeAmout }
    setGatewayAmount(gatewayAmount: number) { this.gatewayAmount = gatewayAmount }
    setMarketplaceAmount(marketplaceAmount: number) { this.marketplaceAmount = marketplaceAmount }
    getFeeAtTheTime(): number { return this.feeAtTheTime }
    setFeeAtTheTime(fee : number) { this.feeAtTheTime = fee }
}