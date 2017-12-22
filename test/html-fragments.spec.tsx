
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
    testEqual('<a href="test">a link</a>', () => <a href="test">a link</a>);
    testEqual(`<ul>
    <li>1</li>
    <li>2</li>
    </ul>`, () => <ul>{[1, 2].map(li => <li>{li}</li>)}</ul>);
    testEqual('<button onclick="doSomething"></button>', () => <button onclick="doSomething"></button>);
    testEqual('<div class="class-a"></div>', () => <div class="class-a"></div>);
    testEqual('<script src="jquery.js" integrity="sha256-123=" crossorigin="anonymous"></script>', () => <script src="jquery.js" integrity="sha256-123=" crossorigin="anonymous"></script>);
});

describe('Self-closing html tags', () => {
    testEqual('<area>', () => <area></area>);
    testEqual('<hr>', () => <hr></hr>);
    testEqual('<hr>content</hr>', () => <hr>content</hr>);
    testEqual('<meta charset="utf8">', () => <meta charset="utf8"></meta>);
    testEqual('<video autoplay></video>', () => <video autoplay=""></video>);
});

describe('Boolean attributes', () => {
    // https://www.w3.org/TR/html5/infrastructure.html#boolean-attributes
    testEqual('<input checked>', () => <input checked={true}></input>);
    testEqual('<input>', () => <input checked={false}></input>);
    testEqual('<input disabled>', () => <input disabled={true}></input>);
    testEqual('<input>', () => <input disabled={false}></input>);
    testEqual('<p draggable spellcheck hidden translate></p>', () => <p draggable spellcheck hidden translate></p>);
    testEqual('<p></p>', () => <p draggable={false} spellcheck={false} hidden={false} translate={false}></p>);
    testEqual('<form novalidate></form>', () => <form novalidate></form>)
});

describe('Encoded attributes', () => {
    it('should encode " as &quot', () => {
        expect(<div class={'\"'}></div>).to.eq('<div class="&quot;"></div>');
    });
    it('should encode & as &amp', () => {
        expect(<div class={'&'}></div>).to.eq('<div class="&amp;"></div>');
    });
    it('should encode \\u00A0 as &nbsp', () => {
        expect(<div class={'\u00A0'}></div>).to.eq('<div class="&nbsp;"></div>');
    });
});

describe('Events', () => {
    testEqual('<div onclick="click" onmouseover="mouseover" ondrag="ondrag"></div>', () => <div onclick="click" onmouseover="mouseover" ondrag="ondrag"></div>);
    testEqual('<form onfocus="focus"><input onblur="blur"></form>', () => <form onfocus="focus"><input onblur="blur"></input></form>);
    testEqual('<video onabort="abort" onseeking="seeking"></video>', () => <video onabort="abort" onseeking="seeking"></video>);
});

describe('Using a Date type attribute', () => {
    testEqual('<time datetime="1914-12-20T08:00:00.000Z"></time>', () => <time datetime={new Date('1914-12-20T08:00+0000')}></time>);
    testEqual('<ins datetime="1914-12-20T08:00:00.000Z">new</ins>', () => <ins datetime={new Date('1914-12-20T08:00+0000')}>new</ins>);
    testEqual('<del datetime="1914-12-20T08:00:00.000Z">old</del>', () => <del datetime={new Date('1914-12-20T08:00+0000')}>old</del>);
});

describe('using a number attribute', () => {
    testEqual('<ol start="1"><li value="2">2</li></ol>', () => <ol start={1}><li value={2}>2</li></ol>);
    testEqual('<meter value="2" min="1" max="3" low="0" high="5" optimum="3"></meter>', () => <meter value={2} min={1} max={3} low={0} high={5} optimum={3}></meter>);
    testEqual('<progress value="2" max="5"></progress>', () => <progress value={2} max={5}></progress>);
    testEqual('<td colspan="2" rowspan="5"></td>', () => <td colspan={2} rowspan={5}></td>);
    testEqual('<th colspan="2" rowspan="5"></th>', () => <th colspan={2} rowspan={5}></th>);
});

describe('custom elements', () => {
    testEqual('<custom-element a-custom-attr="value" custom-li-attr="li"></custom-element>', () => <customElement ACustomAttr="value" customLIAttr="li"></customElement>);
    testEqual('<div some-data="s"></div>', () => <div some-data="s"></div>);
});

describe('helper components', () => {
    const Header: elements.CustomElementHandler = (attributes, contents) => <h1 {...attributes}>{contents}</h1>;

    function Button(attributes: elements.Attributes | undefined, contents: string[]) {
        return <button type='button' class='original-class' {...attributes}>{contents}</button>;
    }

    testEqual('<h1 class="title"><span>Header Text</span></h1>', () => <Header class='title'><span>Header Text</span></Header>);
    testEqual('<button class="override" type="button"></button>', () => <Button class='override'/>);
    testEqual('<button class="original-class" type="button">Button Text</button>', () => <Button>Button Text</Button>);
});