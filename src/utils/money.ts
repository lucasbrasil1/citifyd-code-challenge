import Dinero from "dinero.js"

export const money = (value : number | string) => {
    return Dinero({amount : Number(value)})
}

export const formatMoney = (productPrice: number) => {
    return Dinero({ amount : Number(productPrice) }).toFormat("$0.00")
}