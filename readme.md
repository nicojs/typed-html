[![Build Status](https://travis-ci.org/nicojs/typed-html.svg?branch=master)](https://travis-ci.org/nicojs/typed-html)

# Typed html

Html templates have never been this easy. Type safe using plain TypeScript with a minimal runtime footprint.

This:

```typescript
// example.tsx

const items = ['item', 'item2'];
function handleClick(event: MouseEvent) { }
const icon = 'icon-add';
<ul>
    {items.map(i => <li>{i}</li>)}
</ul>;

<button onClick={click}>
    <i class={icon}></i>
</button>
```

Becomes: 

```html
<ul>
    <li>item</li>
    <li>item2</li>
</ul>
<button on-click="handleClick">
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

Now create a \*.ts**x** file. For example: `example.tsx` with the following content:

```typescript
// example.tsx
import * as elements from 'typed-html';

const w = 'world';
const strongTag = <p>Hello <strong>{w}</strong></p>;

typeof strongTag; // => Just a string of course
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

## How it works

The way this works is by using TypeScript's jsx support, but not for jsx/react interoperability. Instead, it defines the *normal* html tags as `IntrinsicElements` in the JSX namespace.

At runtime, the `elements.createElement` function is called for every html tag. It simply converts the given element to a string with minimal overhead.
