import Dinero from "dinero.js"

export const money = (value : Number | String) => {
    return Dinero({amount : Number(value)})
}

export const formatMoney = (productPrice: Number) => {
    return Dinero({ amount : Number(productPrice) }).toFormat("$0.00")
}