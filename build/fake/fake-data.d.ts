import Decimal from "decimal.js";
export declare function fakeUser(): {
    telegramId: string;
    username: undefined;
};
export declare function fakeUserComplete(): {
    id: number;
    telegramId: string;
    username: undefined;
    createdAt: Date;
};
export declare function fakeCategory(): {
    name: string;
};
export declare function fakeCategoryComplete(): {
    id: number;
    name: string;
};
export declare function fakeProduct(): {
    name: string;
    description: undefined;
    price: Decimal;
};
export declare function fakeProductComplete(): {
    id: number;
    name: string;
    description: undefined;
    price: Decimal;
    categoryId: number;
    createdAt: Date;
};
//# sourceMappingURL=fake-data.d.ts.map