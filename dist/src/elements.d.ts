/// <reference path="../../src/jsx/element-types.d.ts" />
/// <reference path="../../src/jsx/events.d.ts" />
/// <reference path="../../src/jsx/intrinsic-elements.d.ts" />
declare type AttributeValue = any;
export interface Children {
    children?: AttributeValue;
}
export interface CustomElementHandler {
    (attributes: Attributes & Children, contents: string[]): string;
}
export interface Attributes {
    [key: string]: AttributeValue;
}
export declare function createElement(name: string | CustomElementHandler, attributes?: Attributes & Children | undefined, ...contents: string[]): string;
export {};
//# sourceMappingURL=elements.d.ts.map