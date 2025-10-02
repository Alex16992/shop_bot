export const __esModule: boolean;
export namespace Prisma {
    namespace TransactionIsolationLevel {
        let ReadUncommitted: string;
        let ReadCommitted: string;
        let RepeatableRead: string;
        let Serializable: string;
    }
    namespace UserScalarFieldEnum {
        let id: string;
        let telegramId: string;
        let username: string;
        let createdAt: string;
    }
    namespace SortOrder {
        let asc: string;
        let desc: string;
    }
    namespace QueryMode {
        let _default: string;
        export { _default as default };
        export let insensitive: string;
    }
    namespace NullsOrder {
        let first: string;
        let last: string;
    }
    namespace ModelName {
        let User: string;
    }
}
export const $Enums: {};
export namespace Prisma {
    export namespace prismaVersion {
        let client: string;
        let engine: string;
    }
    export function PrismaClientKnownRequestError(): never;
    export function PrismaClientUnknownRequestError(): never;
    export function PrismaClientRustPanicError(): never;
    export function PrismaClientInitializationError(): never;
    export function PrismaClientValidationError(): never;
    export { Decimal };
    /**
     * Re-export of sql-template-tag
     */
    export function sql(): never;
    export function empty(): never;
    export function join(): never;
    export function raw(): never;
    export let validator: typeof Public.validator;
    /**
    * Extensions
    */
    export function getExtensionContext(): never;
    export function defineExtension(): never;
    export let DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    export let JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    export let AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    export namespace NullTypes {
        let DbNull_1: {
            new (arg?: symbol): {
                "__#private@#private": any;
                _getNamespace(): string;
                _getName(): string;
                toString(): string;
            };
        };
        export { DbNull_1 as DbNull };
        let JsonNull_1: {
            new (arg?: symbol): {
                "__#private@#private": any;
                _getNamespace(): string;
                _getName(): string;
                toString(): string;
            };
        };
        export { JsonNull_1 as JsonNull };
        let AnyNull_1: {
            new (arg?: symbol): {
                "__#private@#private": any;
                _getNamespace(): string;
                _getName(): string;
                toString(): string;
            };
        };
        export { AnyNull_1 as AnyNull };
    }
}
/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
export class PrismaClient {
}
import { Decimal } from "./runtime/index-browser.js";
import { Public } from "./runtime/index-browser.js";
//# sourceMappingURL=index-browser.d.ts.map