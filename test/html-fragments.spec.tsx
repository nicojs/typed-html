import * as elements from '../src/elements';
import { expect } from 'chai';
const logger = require('html-differ/lib/logger');
const HtmlDiffer = require('html-differ').HtmlDiffer;

const singleLine = (input: string) => input.replace(/\r\n/g, '').replace(/\n/g, '');

const testEqual = (expected: string, actual: () => string, itImplementation: (expectation: string, callback?: (this: Mocha.ITestCallbackContext, done: MochaDone) => any) => Mocha.ITest = it) => {
    itImplementation(`should parse "${singleLine(expected)}" correctly`, () => {
        const htmlDiffer = new HtmlDiffer();
        const diff: string = logger.getDiffText(htmlDiffer.diffHtml(expected, actual()));
        expect(diff, diff).to.have.lengthOf(0);
    });
};

describe('Simple html structures', () => {

    const doSomething = () => { };
    testEqual('<a href="test">a link</a>', () => <a href="test">a link</a>);
    testEqual(`<ul>
    <li>1</li>
    <li>2</li>
    </ul>`, () => <ul><li>1</li><li>2</li></ul>);
    testEqual('<button on-click="doSomething"></button>', () => <button onClick={doSomething}></button>);
});

describe('Self-closing html tags', () => {
    testEqual('<area>', () => <area></area>);
    testEqual('<hr>', () => <hr></hr>);
    testEqual('<hr>content</hr>', () => <hr>content</hr>);
});

