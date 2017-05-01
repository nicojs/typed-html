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
    <li>item2</li>
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
        // ...
        "jsx": "react",
        "jsxFactory": "elements.createElement"
    }
}
```

Although we're configuring the compiler to use [React](https://facebook.github.io/react), this is not used at all.
Instead, we redirect all jsx element to typed-html's `elements.createElement`.

Now create a \*.ts**x** file. For example: `example.tsx` with the following content:

```typescript
// example.tsx
import * as elements from 'typed-html';

const w = 'world';
const helloWorld = <p>Hello <strong>{w}</strong></p>;

typeof helloWorld; // => Just a string of course
```

## Supported scenarios

All template scenarios are supported with plain TypeScript.

### Control flow

Conditional template with `?`

```typescript
<div>Random > 0.5: {Math.random()>.5 ? <strong>yes</strong> : 'no'}</div>
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

## Supported elements

All html5 elements and attributes are supported, except for the [svg](https://www.w3.org/TR/SVG/).

* Supported html elements: https://dev.w3.org/html5/html-author/#the-elements
* Supported html events: http://htmlcss.wikia.com/wiki/HTML5_Event_Attributes

Missing an element? Please create an issue or a PR to add it. It's easy to add.

### Add custom elements

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

## How it works

The way this works is by using TypeScript's jsx support, but not for jsx/react interoperability. Instead, it defines the *normal* html tags as `IntrinsicElements` in the JSX namespace.

At runtime, the `elements.createElement` function is called for every html tag. It simply converts the given element to a string with minimal overhead.
