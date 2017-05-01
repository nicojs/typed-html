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

All HTML attributes support a string value, however some attributes also support a [`number`](https://developer.mozilla.org/en-US/docs/Glossary/Number) or [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/prototype) type:

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