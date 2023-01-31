import { faker } from "@faker-js/faker";
import Dinero from "dinero.js";
import { formatMoney, money } from "./money";

describe('money utils tests', () => {
    it('should format the integer type to formatted string correctly', () => {
        const integer = 5200;
        const result = formatMoney(integer);

        expect(result).toBe('$52.00');
        expect(result).not.toBe('$51.00');
        expect(result).not.toBe('52,00');
        expect(result).not.toBe('$52,00');
        expect(result).not.toBe('$52.01');
        expect(result).not.toBe('$5201');
    })

    it('should create a proper Dinero object', () => {
        const random = faker.random.numeric(7)
        const newMoney = money(Number(random));
        const dinero = Dinero({
            amount : Number(random)
        })

        expect(newMoney.getAmount()).toBe(dinero.getAmount());
        expect(newMoney.getCurrency()).toBe(dinero.getCurrency());
        expect(newMoney.getPrecision()).toBe(dinero.getPrecision());
    })
})