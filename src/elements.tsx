/// <reference path="./jsx/element-types.d.ts" />
/// <reference path="./jsx/events.d.ts" />
/// <reference path="./jsx/intrinsic-elements.d.ts" />

type AttributeValue = number | string | Date | boolean | string[];

export interface Children {
    children?: AttributeValue;
}

export interface CustomElementHandler {
    (attributes: Attributes & Children, contents: string[]): string;
}

export interface Attributes {
    [key: string]: AttributeValue;
}

const capitalACharCode = 'A'.charCodeAt(0);
const capitalZCharCode = 'Z'.charCodeAt(0);

const isUpper = (input: string, index: number) => {
    const charCode = input.charCodeAt(index);
    return capitalACharCode <= charCode && capitalZCharCode >= charCode;
};

const toKebabCase = (camelCased: string) => {
    let kebabCased = '';
    for (let i = 0; i < camelCased.length; i++) {
        const prevUpperCased = i > 0 ? isUpper(camelCased, i - 1) : true;
        const currentUpperCased = isUpper(camelCased, i);
        const nextUpperCased = i < camelCased.length - 1 ? isUpper(camelCased, i + 1) : true;
        if (!prevUpperCased && currentUpperCased || currentUpperCased && !nextUpperCased) {
            kebabCased += '-';
            kebabCased += camelCased[i].toLowerCase();
        } else {
            kebabCased += camelCased[i];
        }
    }
    return kebabCased;
};

const escapeAttrNodeValue = (value: string) => {
    return value.replace(/(&)|(")|(\u00A0)/g, function (_, amp, quote) {
        if (amp) return '&amp;';
        if (quote) return '&quot;';
        return '&nbsp;';
    });
};

const attributeToString = (attributes: Attributes) => (name: string): string => {
    const value = attributes[name];
    const formattedName = toKebabCase(name);
    const makeAttribute = (value: string) => `${formattedName}="${value}"`;
    if (value instanceof Date) {
        return makeAttribute(value.toISOString());
    } else switch (typeof value) {
        case 'boolean':
            // https://www.w3.org/TR/2008/WD-html5-20080610/semantics.html#boolean
            if (value) {
                return formattedName;
            } else {
                return '';
            }
        default:
            return makeAttribute(escapeAttrNodeValue(value.toString()));
    }
};

const attributesToString = (attributes: Attributes | undefined): string => {
    if (attributes) {
        return ' ' + Object.keys(attributes)
            .filter(attribute => attribute !== 'children') // filter out children attributes
            .map(attributeToString(attributes))
            .filter(attribute => attribute.length) // filter out negative boolean attributes
            .join(' ');
    } else {
        return '';
    }
};

const contentsToString = (contents: any[] | undefined) => {
    if (contents) {
        return contents
            .map(elements => Array.isArray(elements) ? elements.join('\n') : elements)
            .join('\n');
    } else {
        return '';
    }
};

const isVoidElement = (tagName: string) => {
    return [
        'area',
        'base',
        'br',
        'col',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ].indexOf(tagName) > -1;
};

export function createElement(name: string | CustomElementHandler,
    attributes: Attributes & Children | undefined = {},
    ...contents: string[]) {
    const children = attributes && attributes.children || contents;

    if (typeof name === 'function') {
        return name(children ? { children, ...attributes } : attributes, contents);
    } else {
        const tagName = toKebabCase(name);
        if (isVoidElement(tagName) && !contents.length) {
            return `<${tagName}${attributesToString(attributes)}>`;
        } else {
            return `<${tagName}${attributesToString(attributes)}>${contentsToString(contents)}</${tagName}>`;
        }
    }
}
