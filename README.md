[![Build Status](https://travis-ci.org/nicojs/typed-html.svg?branch=master)](https://travis-ci.org/nicojs/typed-html)

# Typed HTML

HTML templates have never been this easy. Type safe using plain TypeScript with a minimal runtime footprint.
No need to learn a template language, if you know TypeScript, you're set.

This:

```typescript
// example.tsx
const item = 'item';
const icon = 'icon-add';
const ul = <ul>
    <li>{item}</li>
</ul>;

typeof ul; // string

const button = <button onclick="handleClick">
    <i class={icon}></i>
</button>;

typeof button; // string

console.log(ul);
console.log(button);
```

Prints: 

```html
<ul>
    <li>item</li>
</ul>
<button onclick="handleClick">
    <i class="icon-add"></i>
</button>
```

## Getting started

Install:

```bash
npm install --save typed-html
```

Configure your TypeScript compiler for JSX:

```json
{
    "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "elements.createElement"
    }
}
```

Although we're configuring the compiler to use [React](https://facebook.github.io/react), this is not what is being used.
Instead, we redirect all jsx element to typed-html's `elements.createElement`.

Now create a \*.ts**x** file. For example: `example.tsx` with the following content:

```typescript
// example.tsx
import * as elements from 'typed-html';

const w = 'world';
const helloWorld = <p>Hello <strong>{w}</strong></p>;

typeof helloWorld; // => Just a string of course
```

However, the following piece of code will **NOT** compile:

```typescript
<foo></foo>; // => Error: Property 'foo' does not exist on type 'JSX.IntrinsicElements'.
<a foo="bar"></a>; // => Error:  Property 'foo' does not exist on type 'HtmlAnchorTag'
```

## Supported environments

Typed HTML supports both NodeJS and (since 2.0) the browser.

For use in the browser, either load typed-html as a module, or use a bundler like webpack or rollup to bundle the package for you.

```ts
// Direct ES import:
import * as elements from './node_modules/typed-html/dist/elements.js';
// OR, when using a bundler like rollup or webpack
import * as elements from 'typed-html';
```

## Supported scenarios

All template scenarios are supported with plain TypeScript.

### Control flow

Conditional template with `?`

```typescript
<div>Random > 0.5: {Math.random() > .5 ? <strong>yes</strong> : 'no'}</div>
```

Repeat a template with `Array.map`

```typescript
const items = ['item', 'item2'];
<ul>
    {items.map(i => <li>{i}</li>)}
</ul>;
```

### Helper templates

Want a helper template? Just call a function

```typescript
function listItem(n: number) {
    return <li>{n}</li>;
}
<ul>
    {[1, 2].map(listItem)}
</ul>
```

#### Using a helper template like an element

Want a helper component? Create a function that implements CustomElementHandler and you can call it like an HTML element. 

```typescript
import {Attributes, CustomElementHandler} from "typed-html"

function Button(attributes: Attributes | undefined, contents: string[]) {
    return <div><button type="button" class="original-class" {...attributes}>{contents}</button></div>;
}
// Or 
const Button: CustomElementHandler = (attributes, contents) => <div><button type="button" class="original-class" {...attributes}>{contents}</button></div>;
}
    
console.log(<Button style="color:#f00">Button Text</Button>);
```

Prints: 

```html
<div>
    <button type="button" class="original-class" style="color:#f00">Button Text</button>
</div>
```

#### React-style children

It's possible to write React-style components as well. Consider the example below.

```typescript
import {Attributes, CustomElementHandler} from "typed-html"

function Button({ children, ...attributes }: Attributes) {
    return <div><button type="button" class="original-class" {...attributes}>{children}</button></div>;
}

console.log(<Button style="color:#f00">Button Text</Button>);
```

Prints:

```html
<div>
    <button type="button" class="original-class" style="color:#f00">Button Text</button>
</div>
```

## Sanitization

Security is *NOT* a feature. This library does *NOT* sanitize.

```ts
const script = '<script>alert("hacked!")</script>';
const body = <body>{script}</body>;
```

Will result in:

```html
<body><script>alert('hacked!');</script></body>
```

If you need sanitization, you can use something like [sanitize-html](https://www.npmjs.com/package/sanitize-html).

## Supported HTML

All HTML elements and attributes are supported, except for the [svg](https://www.w3.org/TR/SVG/).

* Supported html elements: https://dev.w3.org/html5/html-author/#the-elements
* Supported html events: http://htmlcss.wikia.com/wiki/HTML5_Event_Attributes

Missing an element or attribute? Please create an issue or a PR to add it. It's easy to add.

### Void elements

[Void elements](https://www.w3.org/TR/html51/syntax.html#void-elements) (elements without closing tags) are supported, however you should close them in TypeScript.

```typescript
const img = <img href="/foo/bar.png">; // => Error! JSX element 'img' has no corresponding closing tag.
``` 

In the example above, closing the image tag is required for valid TSX code:

```typescript
const img = <img href="/foo/bar.png"></img>; // => '<img href="/foo/bar.png">'
```

See [this code](https://github.com/nicojs/typed-html/blob/master/src/elements.tsx#L68) for a list of supported void elements.

### Attribute types

All HTML attributes support a string value, however some attributes also support a [`number`](https://www.w3.org/TR/html51/infrastructure.html#numbers), [`Date`](https://www.w3.org/TR/html51/infrastructure.html#dates-and-times) or [`boolean`](https://www.w3.org/TR/html51/infrastructure.html#sec-boolean-attributes)(or absent value) type:

```typescript
<meter value={1} min={0} max={5} low={1} high={4} optimum={3}></meter>; 
// => <meter value="1" min="0" max="5" low="1" high="4" optimum="3"></meter>
<ol start={3}></ol>;
<progress value={3} max={4}></progress>;
<td colspan={3} rowspan={3}></td>;
<th colspan={3} rowspan={3}></th>;

const date = new Date('1914-12-20T08:00');
<time datetime={date}></time>; 
// => <time datetime="1914-12-20T08:00:00.000Z"></time>
<ins datetime={date}>updated</ins>;
<del datetime={date}>old</del>;

// => <form> <input type="checkbox" checked> </form>
<form novalidate={false}> 
    <input type="checkbox" checked disabled={false}></input>
</form>
```

## Custom elements

You can add custom elements by adding them to the [intrinsic elements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) yourself:

```typescript
// MyCustomElements.d.ts

declare namespace JSX {
    interface CustomElement {
        customAttribute?: string;
    }
    interface IntrinsicElements {
        myCustomElement: CustomElement;
    }
}
```

Now you can use it:

```typescript
// UseCustomElement.ts
import * as elements from 'typed-html';

const myElement = <myCustomElement customAttribute="customValue"></myCustomElement>
console.log(myElement);
```

This prints:

```html
<my-custom-element custom-attribute="customValue"></my-custom-element>
```

### Custom attributes

Custom attribute names are already supported out-of-the-box for attributes with a dash (`-`) in the name. For example: 

```typescript
<button data-menu-item="3"></button>
```

### Transformation

As a browser is case insensitive when it comes to element and attribute names, it is common practice to use [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) for this. However `<custom-element></custom-element>` is not allowed in TypeScript. Therefore `typed-html` will transform `<customElement></customElement>` to `<custom-element></custom-element>`.

This transformation also works for custom attributes you define on a custom element yourself. For example:

```typescript
<customElement aCustomAttr="value"></customElement>
```

Becomes

```html
<custom-element a-custom-attr="value"></custom-element>
``` 

## How this all works

The way this works is by using TypeScript's jsx support, but not for jsx/react interoperability. Instead, it defines the *normal* html tags as `IntrinsicElements` in the JSX namespace.

At runtime, the `elements.createElement` function is called for every html tag. It simply converts the given element to a string with minimal overhead.

This:

```typescript
<ol start={2}>{[1, 2].map(i => <li>{i}</li>)}</ol>
```

Compiles to:

```javascript
elements.createElement("ol", { start: 2 }, [1, 2].map(function (li) { 
    return elements.createElement("li", null, li); 
}));
```

Which translates to:

```html
<ol start="2">
    <li>1</li>
    <li>2</li>
</ol>
```